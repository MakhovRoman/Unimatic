import { Button, Stack, TextField } from "@mui/material";
import { TaskRequestData } from "@services/slices/task-slice";
import { REQUIRED_MESSAGE } from "@utils/validation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export const ModalForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      title: '',
      content: ''
    },
    mode: "onChange"
  });

  const onSubmit: SubmitHandler<TaskRequestData> = data => {
    console.log(data)
  }

  // TODO: Add title and content to localstorage. Try to use ref.

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
              onChange={field.onChange}
              error={!!errors.title?.message}
              helperText={errors.title?.message}
            />
          )}
        />
      </Stack>
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={!isValid}
      >
        Submit
      </Button>
    </form>
  )
}
