import { Modal } from '@components/modal/modal'
import { TaskList } from '@components/task-list/task-list'

export const Application = () => {
  return (
    <>
      <TaskList />
      <Modal />
    </>
  )
}
