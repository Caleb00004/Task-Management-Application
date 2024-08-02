import { useEffect, useRef, FC, useState, ChangeEvent } from "react";
import { useCreateTaskMutation } from "@/redux/taskSlice";

interface modalType {
    isModalOpen: boolean;
    closeModal: () => void;
    // children: ReactNode;
}

interface FormType {
    title: string,
    completed: boolean
}

const CreateTaskModal: FC<modalType> = ({ isModalOpen, closeModal}) => {
    const [createTask] = useCreateTaskMutation()    
    const [loading, setLoading] = useState(false)
    const [formDetails, setFormDetails] = useState<FormType>({
        title: "",
        completed: false
    })
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            closeModal();
          }
        };
    
        if (isModalOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen, closeModal]);

    if (!isModalOpen) {
        return null;
    }

    const handleSubmit = () => {
        setLoading(true)
        try {
            createTask(formDetails).unwrap()
                .then(fulfilled => {
                    closeModal()
                    console.log(fulfilled)
                    setLoading(false)
                })
                .catch(rejected => {
                    console.error(rejected)
                    setLoading(false)
                })
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const handleFormChange = (e: ChangeEvent<HTMLElement>, name: keyof FormType) => {
        // @ts-ignore
        name === "title" && setFormDetails(prev => ({...prev, title: e.target.value}))

        name === "completed" && setFormDetails(prev => ({...prev, completed: !prev.completed}))
    }


    return (
      <div className="fixed z-[10] inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div ref={modalRef} className="relative p-4 bg-white flex flex-col rounded-lg shadow-lg w-full md:w-1/2">
            <p className="cursor-pointer text-[1.8em] ml-auto mr-8 text-gray-600" onClick={closeModal}>
                &times;
            </p>
            <div className={""}>
                <h1 className="text-[1.3em]">Create Modal</h1>
                <div className="mt-2 gap-2 flex flex-col">
                    <input onChange={(e) => handleFormChange(e, "title")} type="text" className="border w-[95%] px-4 py-1" placeholder="Enter Title" />
                    <div className="flex mt-2 items-center gap-3">
                        <p>Completed?</p>
                        <input type="checkbox" checked={formDetails.completed} onChange={(e) => handleFormChange(e, "completed")} className="mr-auto" />
                    </div>
                </div>
            </div>
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-1 mx-auto mt-5">{loading ? "loading..." : "Submit"}</button>
        </div>
      </div>
    );
  };

export default CreateTaskModal