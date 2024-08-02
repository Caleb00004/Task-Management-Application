import { useEffect, useRef, FC, ReactNode, useState, FormEventHandler } from "react";
import { useUpateCompletionMutation } from "@/redux/taskSlice";

interface modalType {
    isModalOpen: boolean;
    closeModal: () => void;
    taskId: string
    // children: ReactNode;
}

interface FormType {
    title: string,
    completed: boolean
}

const UpdateCompletionModal: FC<modalType> = ({ isModalOpen, closeModal, taskId}) => {
    const [updateCompletion] = useUpateCompletionMutation()
    const [loading, setLoading] = useState(false)

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

    console.log(taskId)

    const handleSubmit = () => {
        setLoading(true)
        try {
            updateCompletion({taskId: taskId}).unwrap()
                .then(fulfilled => {
                    setLoading(false)
                    console.log(fulfilled)
                    closeModal()
                })
                .catch(rejected => {
                    setLoading(false)
                    console.log(rejected)
                })
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }


    return (
      <div className="fixed z-[10] inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div ref={modalRef} className="relative p-4 bg-white flex flex-col rounded-lg shadow-lg w-full md:w-1/2">
            <p className="cursor-pointer text-[1.8em] ml-auto mr-8 text-gray-600" onClick={closeModal}>
                &times;
            </p>
            <div className={""}>
                <h1 className="text-[1.3em] text-center ">Update Completion ?</h1>
                <div className="flex gap-2 pt-2">
                    <button onClick={handleSubmit} className="bg-blue-500 py-1 text-white flex-1">Yes</button>
                    <button onClick={closeModal} className="bg-red-400 py-1 text-white flex-1">No</button> 
                </div>
            </div>
        </div>
      </div>
    );
  };

export default UpdateCompletionModal