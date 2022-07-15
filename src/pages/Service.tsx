import { useAuth } from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";

import "../styles/service.scss";
import "../styles/input-container.scss";
import { Button } from "../components/Button";
import { DangerButton } from "../components/DangerButton";
import { MenuBar } from "../components/MenuBar";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase.";
import toast, { Toaster } from "react-hot-toast";

export function Service() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [newServiceCategory, setNewServiceCategory] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceUF, setNewServiceUF] = useState("");
  const [newServiceCity, setNewServiceCity] = useState("");
  const [newServiceDescription, setNewServiceDescription] = useState("");

  async function handleCreateService(event: FormEvent) {
    event.preventDefault();

    if (newServiceCategory.trim() === "") {
      showErrorToast("Informe a categoria");
      return;
    }

    if (newServicePrice.trim() === "") {
      showErrorToast("Insira o preço");
      return;
    }

    if (newServiceUF.trim() === "") {
      showErrorToast("Insira a UF");
      return;
    }
    
    if (newServiceCity.trim() === "") {
      showErrorToast("Insira a cidade");
      return;
    }

    if (newServiceDescription.trim() === "" ) {
      showErrorToast("Insira uma descrição");
      return;
    }
      
    const serviceRef = database.ref("services");
    await serviceRef.push({
      category: newServiceCategory,
      price: newServicePrice,
      description: newServiceDescription,
      authorId: user?.id,
      uf: newServiceUF,
      city: newServiceCity,
    });

    navigate(`/services`);
  }

  function backToHome() {
    navigate("/services");
  }

  function showErrorToast(message: String) {
    toast.error(message.toString(), {
      style: {
        color: "#101010",
        background: "#FBFF35",
      },
      iconTheme: {
        primary: "#101010",
        secondary: "#FBFF35",
      },
    })
  }

  return (
    <main id="page-new-service">
      <MenuBar></MenuBar>
      <div className="page-container">
        <h2>Criar um novo serviço</h2>
        <form onSubmit={handleCreateService}>
          <div className="input-container">
            <span className="material-icons">category</span>
            <select
              name="select"
              onChange={(event) => setNewServiceCategory(event.target.value)}
              value={newServiceCategory}
            >
              <option value="none">Categoria</option>
              <option value="jardinagem">Jardinagem</option>
              <option value="faxina">Faxina</option>
            </select>
          </div>

          <div className="input-container">
            <span className="material-icons">attach_money</span>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Preço médio"
              onChange={(event) => setNewServicePrice(event.target.value)}
              value={newServicePrice}
            />
          </div>

          <div className="multi-input-container">
            <div className="input-container" id="input-uf">
              <span className="material-icons">description</span>
              <select
                name="uf"
                onChange={(event) => setNewServiceUF(event.target.value)}
                value={newServiceUF}
              >
                <option value="">UF</option>
                <option value="GO">GO</option>
                <option value="MG">MG</option>
              </select>
            </div>

            <div className="input-container" id="input-city">
              <span className="material-icons">description</span>
              <select
                name="city"
                onChange={(event) => setNewServiceCity(event.target.value)}
                value={newServiceCity}
              >
                <option value="">Cidade</option>
                <option value="urutai">Urutaí</option>
                <option value="pires">Pires do Rio</option>
              </select>
            </div>
          </div>

          <div className="input-container">
            <span className="material-icons">description</span>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Descrição"
              onChange={(event) => setNewServiceDescription(event.target.value)}
              value={newServiceDescription}
            />
          </div>

          <div className="buttons-container">
            <DangerButton id="cancel-button" onClick={backToHome} type="button">
              Cancelar
            </DangerButton>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
