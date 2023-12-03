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
    trigger,
    formState: { errors, isValid },
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

  const handleLiveValidation = async (fieldName: keyof FormState) => {
    await trigger(fieldName);
  };

  const onSubmit: SubmitHandler<FormState> = (data) => {
    dispatch(setFormData(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className={`${errors.name?.message ? '' : 'mb-6'}`}>
        <label htmlFor="name" className="block text-gray-700">
          Name:
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                className="border p-2 w-full"
                onChange={(e) => {
                  field.onChange(e);
                  handleLiveValidation('name');
                }}
                onBlur={() => handleLiveValidation('name')}
              />
              <p className="text-red-500">{errors.name?.message}</p>
            </>
          )}
        />
      </div>

      <div className={`${errors.age?.message ? '' : 'mb-6'}`}>
        <label htmlFor="age" className="block text-gray-700">
          Age:
        </label>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <>
              <input
                type="number"
                {...field}
                className="border p-2 w-full"
                onChange={(e) => {
                  field.onChange(e);
                  handleLiveValidation('age');
                }}
                onBlur={() => handleLiveValidation('age')}
              />
              <p className="text-red-500">{errors.age?.message}</p>
            </>
          )}
        />
      </div>

      <div className={`${errors.email?.message ? '' : 'mb-6'}`}>
        <label htmlFor="email" className="block text-gray-700">
          Email:
        </label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <>
              <input
                type="email"
                {...field}
                className="border p-2 w-full"
                onChange={(e) => {
                  field.onChange(e);
                  handleLiveValidation('email');
                }}
                onBlur={() => handleLiveValidation('email')}
              />
              <p className="text-red-500">{errors.email?.message}</p>
            </>
          )}
        />
      </div>

      <div className={`${errors.password?.message ? '' : 'mb-6'}`}>
        <label htmlFor="password" className="block text-gray-700">
          Password:
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <input
                type="password"
                {...field}
                className="border p-2 w-full"
                onChange={(e) => {
                  field.onChange(e);
                  handleLiveValidation('password');
                }}
                onBlur={() => handleLiveValidation('password')}
              />
              <p className="text-red-500">{errors.password?.message}</p>
            </>
          )}
        />
      </div>

      <div className={`${errors.confirmPassword?.message ? '' : 'mb-6'}`}>
        <label htmlFor="confirmPassword" className="block text-gray-700">
          Confirm Password:
        </label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <>
              <input
                type="password"
                {...field}
                className="border p-2 w-full"
                onChange={(e) => {
                  field.onChange(e);
                  handleLiveValidation('confirmPassword');
                }}
                onBlur={() => handleLiveValidation('confirmPassword')}
              />
              <p className="text-red-500">{errors.confirmPassword?.message}</p>
            </>
          )}
        />
      </div>

      <div className={`${errors.gender?.message ? '' : 'mb-6'}`}>
        <label className="block text-gray-700">Gender:</label>
        <div className="flex flex-col">
          <label className="inline-flex items-center mb-2">
            <input
              {...register('gender')}
              type="radio"
              value="male"
              className="form-radio"
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="inline-flex items-center mb-2">
            <input
              {...register('gender')}
              type="radio"
              value="female"
              className="form-radio"
            />
            <span className="ml-2">Female</span>
          </label>
        </div>
        <p className="text-red-500">{errors.gender?.message}</p>
      </div>

      <div className={`${errors.acceptTerms?.message ? '' : 'mb-6'}`}>
        <label className="inline-flex items-center">
          <input
            {...register('acceptTerms')}
            type="checkbox"
            className="form-checkbox"
          />
          <span className="ml-2">Accept T&C</span>
        </label>
        <p className="text-red-500">{errors.acceptTerms?.message}</p>
      </div>

      <button
        type="submit"
        className={`bg-blue-500 text-white py-2 px-4 rounded ${
          !isValid && 'opacity-50 cursor-not-allowed'
        }`}
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  );
};

export default HookFormPage;
