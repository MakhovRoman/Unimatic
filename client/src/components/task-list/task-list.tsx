import { TaskItem } from '@components/task-item/task-item'
import styles from './task-list.module.scss'
import { TaskCreator } from '@components/task-creator/task-creator'
import { useSelector } from '@services/hooks'
import { selectTaskData } from '@services/slices/task-slice'
import { TaskResponseData } from '@services/api/types'

export const TaskList = () => {
  const {taskList} = useSelector(selectTaskData);

  return (
    <div className={styles.taskList}>
      {taskList.map((item: TaskResponseData)  =>
        <TaskItem
          key={`task-item-${item.id}`}
          title={item.title}
          body={item.content}
          createdAt={item.createdAt}
          id={item.id}
        />)
      }
      <TaskCreator />
    </div>
  )
}
