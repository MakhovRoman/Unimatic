import React, { FC, MouseEvent } from 'react'
import styles from './task-item.module.scss'
import { useDispatch, useSelector } from '@services/hooks'
import { selectTaskData, setCurrentTask } from '@services/slices/task-slice'
import { setModalState } from '@utils/setModalState'

export interface TaskItemProps {
  title: string,
  content: string,
  createdAt: string,
  id: number
}

export const TaskItem: FC<TaskItemProps> = ({title, content, createdAt, id}) => {
  const dispatch = useDispatch();
  const {taskList} = useSelector(selectTaskData)


  const selectHandler = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const targetID = Number(target.getAttribute('data-id'));

    dispatch(setCurrentTask({
      id: targetID,
    }))

    setModalState(taskList, targetID);
  }

  const date = new Date(createdAt)

  return (
    <div
      className={styles.task}
      data-id={id}
      id={`task-${id}`}
      onClick={event => selectHandler(event)}
    >
      <p className={styles.task__title}>{title}</p>
      <div className={styles.task__body}>{content}</div>
      <p className={styles.task__time}>
        <span>{date.toLocaleDateString('ru-RU')}</span>
        <span>{date.toLocaleTimeString('ru-RU')}</span>
      </p>
    </div>
  )
}
