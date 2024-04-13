import { useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import Loading from "./Loading";
interface IFormInput {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = (data: IFormInput) => {
    try {
      console.log(data);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsSuccess(false);
      setIsError(true);
    }
  };

  const inputClasses = [
    "outline-none dark:placeholder-gray-400",
    "rounded focus:outline-none focus:ring-2 focus:ring-cyan-500",
    "dark:bg-stone-600 dark:text-white dark:focus:ring-cyan-400",
  ];

  const spanClasses = ["text-red-500", "text-xs", "-mt-1"];

  const buttonClasses = [
    "bg-cyan-500",
    "dark:bg-cyan-400",
    "text-white",
    "rounded",
    "py-2",
    "px-4",
    "hover:bg-cyan-600",
    "transition",
    "duration-200",
    "ease-in-out",
    "mt-4",
  ];

  if (isLoading) {
    return (
      <div className='w-full flex items-center justify-center p-3'>
        <Loading />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className='w-full flex flex-col items-center justify-center'>
        <img src='/assets/icons/thanks.svg' alt='thanks' className='w-2/3' />
        <p className='dark:text-white'>Mensagem enviada com sucesso! 🎉</p>
        <p className='dark:text-white'>
          Olha no seu E-mail que já tem mensagem! 😎
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='w-full flex flex-col items-center justify-center'>
        <img src='/assets/icons/sorry.svg' alt='thanks' className='w-2/3' />
        <p className='dark:text-white'>Houve algum problema com nosso envio!</p>
        <p className='dark:text-white'>
          Tenta mais tarde por favor?! 🥹
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-2 my-3'>
        <input
          type='text'
          placeholder='Nome'
          {...register("name", {
            required: {
              value: true,
              message:
                "Que tal me dizer qual seu nome pra eu poder te ajudar melhor? 😉",
            },
          })}
          className={inputClasses.join(" ")}
        />
        {errors.name && (
          <span className={spanClasses.join(" ")}>{errors.name.message}</span>
        )}

        <input
          type='email'
          placeholder='Email'
          {...register("email", {
            required: {
              value: true,
              message:
                "Que tal me dizer qual seu email pra eu poder entrar em contato? 😉",
            },
            validate: {
              email: (value) =>
                validator.isEmail(value) ||
                "Que tal me dizer um email válido? 😉",
            },
          })}
          className={inputClasses.join(" ")}
        />
        {errors.email && (
          <span className={spanClasses.join(" ")}>{errors.email.message}</span>
        )}

        <textarea
          placeholder='Message'
          {...register("message", {
            required: {
              value: true,
              message: "Que tal me dizer o que posso fazer por você? 😉",
            },
          })}
          className={inputClasses.join(" ")}
        />
        {errors.message && (
          <span className={spanClasses.join(" ")}>
            {errors.message.message}
          </span>
        )}

        <button type='submit' className={buttonClasses.join(" ")}>
          Submit
        </button>
      </div>
    </form>
  );
}
