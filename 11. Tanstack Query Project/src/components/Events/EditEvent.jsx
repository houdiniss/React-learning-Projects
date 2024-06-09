import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchEvent, updateEvent, queryClient } from '../../utils/utils.js';

import Modal from '../UI/Modal.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventForm from './EventForm.jsx';
import LoadingIndicator from "../UI/LoadingIndicator.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();


  /*****  QUERY  *****/
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ id, signal })
  });

  const { 
    mutate, 
    isPending: pendingMutation , 
    isError: errorMutation , 
    error: hasErrorMutation 
  } = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events' , id],
        refetchType: "none"
      });
      navigate('../');
    }
  });


  /*****  FUNCTIONS  *****/
  function handleSubmit(data) {
    mutate({ id, event: data });
  };

  function handleClose() {
    navigate('../');
  }
 /**********/




 /*****  QUERY STATES  *****/
 let content;

 if(isPending) {
  content = (
    <div className='center'>
      <LoadingIndicator />
    </div>
  )
 }


 if(isError) {
  content = (
    <>
      <ErrorBlock 
        title = "Failed to load event."
        message = {error.info?.message || 'Failed to load event,please try again later.'}
      />
      <div className='form-actions'>
        <Link to='../' className='button'>
          Okay
        </Link>
      </div>
    </>
  )
 }


 if(data){
  content = (
    <EventForm inputData={data} onSubmit={handleSubmit}>
      {!pendingMutation && (
        <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Update
          </button>
        </>
      )}
      {pendingMutation && <p>Submitting Changes..</p>}
      {errorMutation && (
        <ErrorBlock 
          title='Failed to update event.'
          message={
            hasErrorMutation.info?.message || 
            'Failed to update event,please try again later..'
          }
        />
      )}
    </EventForm>
    )
 }

/********************/




  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
