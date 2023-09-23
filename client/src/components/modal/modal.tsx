import { ModalForm } from '@components/modal-form/modal-form';
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useDispatch, useSelector } from '@services/hooks';
import { closeTaskModal, selectTaskData } from '@services/slices/task-slice';

export const Modal = () => {
  const {isOpen} = useSelector(selectTaskData);
  const dispatch = useDispatch();

  const closeHandler = () => dispatch(closeTaskModal());

  return (
    <div>
      <Dialog open={isOpen} onClose={closeHandler}>
        <DialogTitle>Add new task</DialogTitle>
        <DialogContent>
          <ModalForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
