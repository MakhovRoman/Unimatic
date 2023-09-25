import { useDispatch } from 'react-redux'
import styles from './task-creator.module.scss'
import AddIcon from '@assets/add-item.svg?react'
import { openTaskModal, setCurrentTask } from '@services/slices/task-slice';

export const TaskCreator = () => {
  const dispatch = useDispatch();

  const openHandler = () => {
    dispatch(setCurrentTask(null))
    dispatch(openTaskModal())
  }

   return (
    <div className={styles.creator} onClick={openHandler}>
      <AddIcon className={styles.icon}/>
      <span className={styles.creator__text}>Add Task</span>
    </div>
  )
}
