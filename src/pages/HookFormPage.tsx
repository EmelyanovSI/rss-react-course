import { FormState, setFormData, useAppDispatch } from '@/redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Z][a-z]*$/, 'First letter should be uppercased'),
  age: Yup.number()
    .positive('Age should be a positive number')
    .integer('Age should be an integer')
    .required('Age is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*()_+])[0-9a-zA-Z@#$%^&*()_+]{8,}$/,
      'Password must contain 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character'
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Passwords must match'
  ),
  gender: Yup.string().required('Gender is required'),
  acceptTerms: Yup.bool().oneOf(
    [true],
    'Accept Terms & Conditions is required'
  ),
});

const HookFormPage: FC = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormState>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      acceptTerms: false,
    },
  });

  const onSubmit: SubmitHandler<FormState> = (data) => {
    dispatch(setFormData(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <>
              <input {...field} />
              <p>{errors.name?.message}</p>
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <>
              <input type="number" {...field} />
              <p>{errors.age?.message}</p>
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <>
              <input type="email" {...field} />
              <p>{errors.email?.message}</p>
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <input type="password" {...field} />
              <p>{errors.password?.message}</p>
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <>
              <input type="password" {...field} />
              <p>{errors.confirmPassword?.message}</p>
            </>
          )}
        />
      </div>

      <div>
        <label>Gender:</label>
        <label>
          <input {...register('gender')} type="radio" value="male" /> Male
        </label>
        <label>
          <input {...register('gender')} type="radio" value="female" /> Female
        </label>
        <p>{errors.gender?.message}</p>
      </div>

      <div>
        <label>
          <input {...register('acceptTerms')} type="checkbox" /> Accept T&C
        </label>
        <p>{errors.acceptTerms?.message}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default HookFormPage;
