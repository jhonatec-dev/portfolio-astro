import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";
import GenerateEmailBody from "./GenerateBody";
import Loading from "./Loading";

interface IFormInput {
  name: string;
  email: string;
  message: string;
}

const API_URL = import.meta.env.PUBLIC_API_URL;
const USER = import.meta.env.PUBLIC_USER;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit = async (data: IFormInput) => {
    try {
      setIsLoading(true);

      const request = {
        from: USER,
        to: [data.email],
        subject: `Olá ${data.name}, recebi sua mensagem!`,
        body: GenerateEmailBody(data),
        copy: true,
      };
      await axios.post(`${API_URL}/send`, request, {});
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
      }
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

  const spanClasses = ["text-red-500", "text-xs", "mt-1"];

  const buttonClasses = [
    "bg-cyan-500",
    "dark:bg-cyan-500",
    "text-white",
    "rounded",
    "py-2",
    "px-4",
    "hover:bg-cyan-600",
    "dark:hover:bg-cyan-600",
    "transition",
    "duration-200",
    "ease-in-out",
    "mt-4",
  ];

  if (isLoading) {
    return (
      <div className='w-full flex items-center justify-center my-8'>
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
        <p className='dark:text-white'>Tenta mais tarde por favor?! 🥹</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-5 my-3 px-6'>
        <div className='flex flex-col gap-1'>
          <p className='dark:text-white'>😎 Nome</p>
          <input
            placeholder='Digite aqui'
            type='text'
            autoComplete='name'
            {...register("name", {
              required: {
                value: true,
                message:
                  "Que tal me dizer qual seu nome pra eu poder te ajudar melhor? 😉",
              },
              minLength: {
                value: 3,
                message: "Seu nome é tão curto assim? 😅",
              },
            })}
            className={inputClasses.join(" ")}
          />
          {errors.name && (
            <span className={spanClasses.join(" ")}>{errors.name.message}</span>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <p className='dark:text-white'>📧 E-mail</p>
          <input
            placeholder='Digite aqui'
            type='email'
            autoComplete='email'
            {...register("email", {
              required: {
                value: true,
                message:
                  "Que tal me dizer qual seu e-mail pra eu poder entrar em contato? 😉",
              },
              validate: {
                email: (value) =>
                  validator.isEmail(value) ||
                  "Que tal me dizer um e-mail válido? 😉",
              },
            })}
            className={inputClasses.join(" ")}
          />
          {errors.email && (
            <span className={spanClasses.join(" ")}>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <p className='dark:text-white'>📄 Mensagem</p>
          <textarea
            placeholder='Digite aqui'
            autoComplete='message'
            {...register("message", {
              required: {
                value: true,
                message: "Que tal me dizer o que posso fazer por você? 😉",
              },
              minLength: {
                value: 10,
                message: "Sua mensagem é tão curta assim? 😅",
              },
            })}
            className={inputClasses.join(" ")}
          />
          {errors.message && (
            <span className={spanClasses.join(" ")}>
              {errors.message.message}
            </span>
          )}
        </div>
        <button type='submit' className={buttonClasses.join(" ")}>
          Enviar
        </button>
      </div>
    </form>
  );
}
