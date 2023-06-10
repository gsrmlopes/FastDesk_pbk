'use client'
import React, { useRef, useState, useEffect } from "react";
import styles from "../../styles/Hero.module.css";
import Image from "next/image";
import Link from "next/link";
import Modal from "../components/modal";
import { useRouter } from 'next/navigation'
import userService from '../services/user.service'

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCadastroOpen, setIsModalCadastroOpen] = useState(false);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      buttonRef.current.focus();
    }

    const handleKeyDown = (event : React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (isModalOpen) {
          handleLogin();
        } else if (isModalCadastroOpen) {
          handleCadastro();
        }
      } else if (event.key === 'Escape') {
        if (isModalOpen) {
          handleCloseModal();
        } else if (isModalCadastroOpen) {
          handleCloseModalCadastro();
        }

      }
    };

    document.addEventListener('keydown', handleKeyDown as any);

    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const percentage = 25; // Adjust the percentage value as needed
      const calculatedWidth = (viewportWidth * percentage) / 100;
      const calculatedHeigh = (viewportHeight * percentage) / 100;
      setImageWidth(calculatedWidth);
      setImageHeight(calculatedHeigh);
    };

    handleResize(); // Set initial width on component mount

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleKeyDown as any);
      window.removeEventListener('resize', handleResize);
    };
  }, [isModalOpen]);

  const handleLogin = () => {
    userService.loginUser(email, password)
      .then(() => {
        setIsModalOpen(false);
        router.push("/dashboard");
      })
      .catch((err: any) => {
        alert("ERRO : " + err.message);
        console.log(err);
      })
  }

  const handleOpenModalEntrar = () => {
    setIsModalOpen(true);
  };
  const handleOpenModalCadastro = () => {
    setIsModalCadastroOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUsername("");
    setPassword("");
  };
  const handleCloseModalCadastro = () => {
    setIsModalCadastroOpen(false);
    setUsername("");
    setPassword("");
    setEmail("");
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
  const handleCadastro = () => {
    let isValid = true;
    let newErrors = { username: "", email: "", password: "" };

    if (username.trim().length < 6) {
      newErrors.username = "O nome de usuário deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "O email deve ter um formato válido";
      isValid = false;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      newErrors.password =
        "A senha deve ter pelo menos 6 caracteres e conter pelo menos um número e uma letra";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      // Submit the form
      console.log("Form submitted");
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
          <Image
            src="/FastDesk.svg"
            width={imageWidth}
            height={imageHeight}
            style={{ marginBottom: '40px' }}
            alt="FastDesk"
          />
        <h3 style={{ marginBottom: "40px" }}>
          A Sua solução para Velocidade e comunicação com sua empresa!
        </h3>
        <button className={styles.button} onClick={handleOpenModalCadastro}>
          Cadastre-se!
        </button>
        <button className={styles.button} onClick={handleOpenModalEntrar}>
          Entrar
        </button>
        {isModalOpen && (
          <Modal onClose={handleCloseModal} title="Login">
            <form>
              <label>
                E-mail:
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  style={{
                    marginBottom: "15px",
                    borderRadius: "10px",
                    height: "30px",
                    fontSize: "150%",
                  }}
                />
              </label>
              <br />
              <br />
              <label>
                Senha:
                <input
                  type="password"
                  value={password}
                  autoComplete="on"
                  onChange={handlePasswordChange}
                  style={{
                    marginBottom: "15px",
                    borderRadius: "10px",
                    height: "30px",
                    fontSize: "150%",
                  }}
                />
              </label>
            </form>
            <button
              className={styles.button}
              onClick={handleLogin}
              ref={buttonRef}
            >
              Entrar
            </button>
          </Modal>
        )}
        {isModalCadastroOpen && (
          <Modal onClose={handleCloseModalCadastro} title="Cadastro">
            <form>
              <label>
                Usuário:
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  style={{
                    marginBottom: "15px",
                    borderRadius: "10px",
                    height: "30px",
                    fontSize: "150%",
                  }}
                />
              </label>
              {errors.username && <p>{errors.username}</p>}
              <br />
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  style={{
                    marginBottom: "15px",
                    borderRadius: "10px",
                    height: "30px",
                    fontSize: "150%",
                  }}
                />
              </label>
              {errors.email && <p>{errors.email}</p>}
              <br />
              <label>
                Senha:
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  style={{
                    marginBottom: "15px",
                    borderRadius: "10px",
                    height: "30px",
                    fontSize: "150%",
                  }}
                />
              </label>
              {errors.password && <p>{errors.password}</p>}
            </form>
            <button
              className={styles.button}
              onClick={handleCadastro}
              ref={buttonRef}
            >
              Cadastrar
            </button>
          </Modal>
        )}
      </div>
    </section>
  );
}
export default Hero;