import { 
  Link,
  redirect, 
  useNavigate, 
  useParams, 
  useSubmit,
  useNavigation
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchEvent, updateEvent, queryClient } from '../../utils/utils.js';

import Modal from '../UI/Modal.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventForm from './EventForm.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const submit = useSubmit();
  const { state } = useNavigation();



  /*****  QUERY  *****/
  const { data, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
    staleTime: 10000
  });

  // const { 
  //   mutate, 
  //   isPending: pendingMutation , 
  //   isError: errorMutation , 
  //   error: hasErrorMutation 
  // } = useMutation({
  //   mutationFn: updateEvent,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ['events' , id],
  //       refetchType: "none"
  //     });
  //     navigate('../');
  //   }
  // });


  /*****  FUNCTIONS  *****/
  function handleSubmit(data) {
    submit(data, {method: 'PUT'});
  };

  function handleClose() {
    navigate('../');
  }
 /**********/




 /*****  QUERY STATES  *****/
 let content;

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
        {state === 'submitting' ? <p>Submitting...</p> : <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
        </>
        }
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




export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal })
  });
};

export async function action({ request , params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData })
  await queryClient.invalidateQueries(['events'])
  return redirect('../')
};