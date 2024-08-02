/** @format */
import CreateTaskModal from "@/components/createTask";
import UpdateCompletionModal from "@/components/updateCompletion";
import React from "react";
import { useState, useContext } from "react";
import { BASE_URL, useGetAllTaskQuery } from "@/redux/taskSlice";
import { ApiType, taskData} from "@/redux/types";
import axios from "axios"

interface TasksApi extends ApiType {
  data: taskData[]
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [completionOpen, setCompletionOpen] = useState(false);
  const [filter, setFilter] = useState<"" | "completed" | "notcompleted">("")
  const [filtering, setFiltering] = useState(false)
  const [filteredTask, setFilteredTask] = useState<taskData[]>([])
  const [loading, setLoading] = useState(false)
  const {data, status, error} = useGetAllTaskQuery<TasksApi>()
  const [currentTaskId, setCurrentTaskId] = useState("")

  // For Create Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  // For Update Completion Modal
  const openCompletionModal = (id: string) => {
    console.log(id)
    setCurrentTaskId(id)
    setCompletionOpen(true);
  };

  const closeCompletionModal = () => {
    setCompletionOpen(false);
  };

  const handleFilter = async (value: "completed" | "notcompleted") => {
    setFilter(value)
    setLoading(true)
    setFiltering(true)
    try {
      const response = await axios.get(`${BASE_URL}/filter-task/${value}`)
      const data = response.data
      setFilteredTask(data)
      console.log(response)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const clearFilter = () => {
    setFiltering(false)
    setFilter("")
    setLoading(false)
    setFilteredTask([])
  }

  return (
    <div className="flex flex-col px-8 py-8">
      {completionOpen && (
        <UpdateCompletionModal
          // data={userProfileData}
          isModalOpen={completionOpen}
          closeModal={closeCompletionModal}
          taskId={currentTaskId}
        />
      )}

      {modalOpen && (
        <CreateTaskModal
          // data={userProfileData}
          isModalOpen={modalOpen}
          closeModal={closeModal}
        />
      )}

      <h1 className="text-center font-bold text-[1.4em]">TASK MANAGER</h1>
      <div className="flex justify-between items-center mt-5">
        {filtering && <button className=" bg-rose-500 px-4 text-white rounded-md py-2  " onClick={clearFilter}>Clear Filter</button>}
        <button className=" bg-blue-500 px-4 text-white rounded-md py-2 ml-auto mr-4" onClick={openModal}>Create Task</button>    
      </div>

      <div className="flex justify-between items-center my-2">
        <h3 className=" pt-8 text-[1.3em] font-bold">All Task</h3>
        <p>Filter: 
          <span onClick={() => handleFilter("completed")} style={filter === "completed" ? {backgroundColor: "green", color: "white"} : {}} className="ml-1 border cursor-pointer px-3 py-[0.5em] text-[0.8em]">Completed</span>
          <span onClick={() => handleFilter("notcompleted")} style={filter === "notcompleted" ? {backgroundColor: "green", color: "white"} : {}} className="border cursor-pointer px-3 py-[0.5em] text-[0.8em]">Not Completed</span>
        </p>
      </div>
      
      {!filtering && <div className="w-[34em] mt-5 mx-auto">
        {status === "pending" && <p className="text-center ">Loading.....</p>}
        {status === "rejected" && <p className="text-center text-red-500">Error Occured</p>}
        {status === "fulfilled" && data.map(item => (
          <div className="flex px-2 py-1 mb-4 items-center text-[1.1em] gap-2 border justify-between">
            <p><span className="text-blue-600">Title:</span> {item.title}</p>
            <input type="checkbox" onClick={() => openCompletionModal(item._id)} checked={item.completed} />
          </div>

        ))}

      </div>}

        {filtering && 
          <div>
            {loading && <p>Loading.....</p>}
            {!loading && 
               filteredTask.map(item => (
                <div className="flex px-2 py-1 mb-4 items-center text-[1.1em] gap-2 border justify-between">
                  <p><span className="text-blue-600">Title:</span> {item.title}</p>
                  <input type="checkbox" onClick={() => openCompletionModal(item._id)} checked={item.completed} />
                </div>

              ))
            }
          </div>
        }

    </div>
  );
} 
