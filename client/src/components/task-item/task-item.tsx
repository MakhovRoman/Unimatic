import React, { FC, MouseEvent } from 'react'
import styles from './task-item.module.scss'
import { useDispatch } from '@services/hooks'
import { setCurrentTask } from '@services/slices/task-slice'

export interface TaskItemProps {
  title: string,
  body: string,
  createdAt: string,
  id: number
}

export const TaskItem: FC<TaskItemProps> = ({title, body, createdAt, id}) => {
  const dispatch = useDispatch();
  const selectHandler = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    dispatch(setCurrentTask(target.id))
  }

  const date = new Date(createdAt)

  return (
    <div
      className={styles.task}
      id={`task-${id}`}
      onClick={event => selectHandler(event)}
    >
      <p className={styles.task__title}>{title}</p>
      <div className={styles.task__body}>{body}</div>
      <p className={styles.task__time}>
        <span>{date.toLocaleDateString('ru-RU')}</span>
        <span>{date.toLocaleTimeString('ru-RU')}</span>
      </p>
    </div>
  )
}
