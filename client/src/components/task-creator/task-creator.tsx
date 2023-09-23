// import { useSelector } from '@services/hooks'
// import { selectUserData } from '@services/slices/user-slice'
import { useDispatch } from 'react-redux'
import styles from './task-creator.module.scss'
import AddIcon from '@assets/add-item.svg?react'
import { openTaskModal } from '@services/slices/task-slice';

export const TaskCreator = () => {
  const dispatch = useDispatch();
  // const { user } = useSelector(selectUserData);

  const openHandler = () => dispatch(openTaskModal())

   return (
    <div className={styles.creator} onClick={openHandler}>
      <AddIcon className={styles.icon}/>
      <span className={styles.creator__text}>Add Task</span>
    </div>
  )
}
