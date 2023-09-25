import { Loader } from '@components/loader/loader'
import { Modal } from '@components/modal/modal'
import { TaskList } from '@components/task-list/task-list'
import { useSelector } from '@services/hooks'
import { selectTaskData } from '@services/slices/task-slice'

export const Application = () => {
  const taskState = useSelector(selectTaskData);

  return (
    <>
    {
      taskState.isLoading
      ?
      <Loader />
      :
      <>
        <TaskList />
        <Modal />
      </>
    }
    </>
  )
}
