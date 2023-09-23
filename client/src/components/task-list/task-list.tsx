import { TaskItem } from '@components/task-item/task-item'
import styles from './task-list.module.scss'
import { TaskCreator } from '@components/task-creator/task-creator'

export const TaskList = () => {
  return (
    <div className={styles.taskList}>
      <TaskItem title={'first'} body={'By iphone 12 pro'} time={'07:35'} id={1} />
      <TaskItem title={'first'} body={'By iphone 12 pro'} time={'07:35'} id={1} />
      <TaskItem title={'first'} body={'By iphone 12 pro'} time={'07:35'} id={1} />
      <TaskItem title={'first'} body={'By iphone 12 pro'} time={'07:35'} id={1} />
      <TaskCreator />
    </div>
  )
}
