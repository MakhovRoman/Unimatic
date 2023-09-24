import { Button, Stack, TextField } from "@mui/material";
import { TaskRequestData } from "@services/api/types";
import { useDispatch, useSelector } from "@services/hooks";
import { closeTaskModal, taskThunks } from "@services/slices/task-slice";
import { selectUserData } from "@services/slices/user-slice";

import { REQUIRED_MESSAGE } from "@utils/validation";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const ModalForm = () => {
  const modalTitle = localStorage.getItem('modal_title');
  const modalContent = localStorage.getItem('modal_content');

  const [titleValue, setTitleValue] = useState(modalTitle || '');
  const [contentValue, setContentValue] = useState(modalContent || '');

  const {user} = useSelector(selectUserData);
  const dispatch = useDispatch();

  useEffect(() => {
    modalTitle && setTitleValue(modalTitle);
    modalContent && setContentValue(modalContent)
  }, [modalContent, modalTitle])

  const handlerTitleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setTitleValue(value);
    localStorage.setItem('modal_title', value)
  }

  const handlerContentChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setContentValue(value);
    localStorage.setItem('modal_content', value)
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      title: titleValue,
      content: contentValue
    },
    mode: "onChange"
  });

  const onSubmit: SubmitHandler<Pick<TaskRequestData, "title" | "content">> = data => {
    dispatch(taskThunks.create({user_id: Number(user.id), ...data}));
    dispatch(closeTaskModal());
    reset();
  }

  return (
    <form name='add_new_task' onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Controller
          name="title"
          control={control}
          rules={{
            required: REQUIRED_MESSAGE
          }}
          render={({field}) => (
            <TextField
              type="text"
              variant="standard"
              label="Title"
              value={field.value}
              onChange={(e) => {
                field.onChange(e.target.value);
                handlerTitleChange(e)
              }}
              error={!!errors.title?.message}
              helperText={errors.title?.message}
            />
          )}
        />
        <Controller
          name="content"
          control={control}
          rules={{
            required: REQUIRED_MESSAGE
          }}
          render={({field}) => (
            <TextField
              type="text"
              variant="standard"
              label="Content"
              value={field.value}
              onChange={(e) => {
                field.onChange(e.target.value);
                handlerContentChange(e)
              }}
              error={!!errors.content?.message}
              helperText={errors.content?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!isValid}
        >
          Submit
        </Button>
      </Stack>
    </form>
  )
}
