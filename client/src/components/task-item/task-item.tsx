import React, { FC } from 'react'
import styles from './task-item.module.scss'

export interface TaskItemProps {
  title: string,
  body: string,
  time: string,
  id: number
}

export const TaskItem: FC<TaskItemProps> = ({title, body, time, id}) => {
  return (
    <div className={styles.task} id={`task-${id}`}>
      <p className={styles.task__title}>{title}</p>
      <div className={styles.task__body}>{body}</div>
      <p className={styles.task__time}>{time}</p>
    </div>
  )
}
