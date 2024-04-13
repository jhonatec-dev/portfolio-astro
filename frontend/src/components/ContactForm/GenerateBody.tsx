import ReactDOMServer from "react-dom/server";

interface Props {
  name: string;
  message: string;
}

export default function GenerateEmailBody(props: Props) {
  const EmailBody = (
    <div>
      <h1>Olá, {props.name} recebi sua mensagem!</h1>
      <br />
      <h3>
        Agradeço e muito por ter entrado em contato, isso significa muito pra
        mim!
      </h3>
      <h4>Segue a mensagem que você me enviou:</h4>
      <blockquote
        style={{
          backgroundColor: "#f9f9f9",
          borderLeft: "10px solid #ccc",
          margin: "1.5em 10px",
          padding: "0.5em 10px",
          quotes: '"\\201C""\\201D""\\2018""\\2019"',
        }}
      >
        {props.message}
      </blockquote>
      <p>Em breve entrarei em contato.</p>
      <br />
      <br />
      <p>Atenciosamente, <strong>Jhonatec</strong></p>
      <img
        src='https://jhonatec.com/assets/images/email.png'
        alt='Jhonatec Logo'
      />
      <hr />
      <p>
        <small>
          Se você não enviou essa mensagem, por favor, ignore este email.
        </small>
      </p>
      <p>
        <small>
          Este email foi gerado automaticamente, por favor, não responda.
        </small>
      </p>
    </div>
  );

  return ReactDOMServer.renderToString(EmailBody);
}
