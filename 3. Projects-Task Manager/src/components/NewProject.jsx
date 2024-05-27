import {useRef} from "react";
import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

export default function NewProject({onAdd , onCancel}) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const modal = useRef();


  function handleSave() {
    const titleEntered = title.current.value;
    const descriptionEntered = description.current.value;
    const dueDateEntered = dueDate.current.value;

    if (
      titleEntered.trim() === '' ||
      descriptionEntered.trim() === '' ||
      dueDateEntered.trim() === ''
    ) {
      modal.current.open();
      return;
    }

    onAdd({
      title: titleEntered,
      description: descriptionEntered,
      dueDate: dueDateEntered
    });
  }

  return (
    <>
    <Modal ref={modal} buttonCaption={"Close"}>
      <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
      <p className='text-stone-600 mb-4'>Oops..looks like you forgot to enter a valye.</p>
      <p className='text-stone-600 mb-4'>Please make sure you provide a valid value for every input field :=/</p>
    </Modal>
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button 
            className="text-stone-800 hover:text-stone-950"
            onClick={onCancel}
          >
            Cancel
          </button>
        </li>
        <li>
          <button 
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            onClick={handleSave}
          >
              Save
          </button>
        </li>
      </menu>
      <div>
        <Input ref={title} label="Title"/>
        <Input ref={description} label="Description" textarea/>
        <Input ref={dueDate} label="Due Date"/>
      </div>
    </div>
    </>
  )
};

