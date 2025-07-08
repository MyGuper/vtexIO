import React, { ButtonHTMLAttributes, useState } from "react";

import { Link } from 'vtex.render-runtime';
import { useRenderSession } from 'vtex.session-client';

import { useForm, useRewards } from "../../hooks/useRewards";
import DynamicForm from "./formWidget";
import styles from "./styles.css";

function RewardsButton({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={styles.floatButton}>
      Mi Saldo
    </button>
  )
}

function RewardsPopup({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

    const [activeTab, setActiveTab] = useState("cashback");
  const { data: formData } = useForm();
  console.log("formData",formData)
  const { session } = useRenderSession() as any
  const { data } = useRewards()

  const total = data?.cashback?.userBalance?.total

  const isAuthenticated = session?.namespaces?.profile?.isAuthenticated?.value === "true";

  if (!isOpen) return <></>;

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        {isAuthenticated ?
       <div className={styles.popupContainer}>
                <img src="https://cloemx.vtexassets.com/assets/vtex.file-manager-graphql/images/e6c3c1ab-8226-45ca-92c0-49ba59960506___63544382f3b9b8753e11d8d9c167a214.png"></img>
                <h3 className={styles.HeaderInfoImage}>Mi Cashback</h3>
      <div className={styles.popupHeader}>
        <span className={styles.isAuthenticatedHeaderSpan}>Consulta vigencia y políticas de redención</span>
        <button className={styles.popupCloseButton} onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-x-icon lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      <div className={styles.popupTabs}>
        <button
          className={activeTab === "cashback" ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab("cashback")}
        >
          Cashback
        </button>
        <button
          className={activeTab === "howto" ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab("howto")}
        >
          ¿Cómo usarlo?
        </button>
        <button
          className={activeTab === "profile" ? styles.tabActive : styles.tab}
          onClick={() => setActiveTab("profile")}
        >
          Mi perfil
        </button>
      </div>

      <div className={styles.popupContent}>
        {activeTab === "cashback" && (
          <div className={styles.cashbackInfo}>
            <div className={styles.cashbackInfoTabs}>

            <div className={styles.infoRow}>
              <div>
                <img width={"25px"} src="https://cloemx.vtexassets.com/assets/vtex.file-manager-graphql/images/735c2942-1d4e-496a-af65-d9fef2de4b81___b7cf0e6d08f686a96691ac945cdb3cd9.png"></img>
                <div className={styles.infoLabel}>Tienda</div>
                <div>Ecommerce</div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div>
                <img width={"25px"} src="https://cloemx.vtexassets.com/assets/vtex.file-manager-graphql/images/1ffebc03-dfa6-4ebb-9df8-52c984595eb3___7a1b0b35346406e135c4c32af9275dea.png"></img>
                <div className={styles.infoLabel}>Monto</div>
                <div>{(total / 100).toFixed(2)}</div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <div>
                <img width={"25px"} src="https://cloemx.vtexassets.com/assets/vtex.file-manager-graphql/images/8b610e44-8003-493a-aa14-285810a96978___245653f63b18678b60edc566197294eb.png"></img>
                <div className={styles.infoLabel}>Vigencia</div>
                <div>28/05/2025</div>
              </div>
            </div>
            </div>

            <p className={styles.infoFooter}>Puedes usarlo para pagar hasta el 20% del valor de tu próxima compra.</p>
          </div>
        )}

        {activeTab === "howto" && (
       <div className={styles.popupContentTutorial}  >
          <div className={styles.step}>
    <div className={styles.number}>1</div>
    <div className={styles.text}>
      Inicia sesión.
    </div>
  </div>
  <div className={styles.step}>
    <div className={styles.number}>2</div>
    <div className={styles.text}>
      En el carrito, dá clic en <br />“Proceder al Pago”.
    </div>
  </div>

  <div className={styles.step}>
    <div className={styles.number}>3</div>
    <div className={styles.text}>
      En el método de pago, selec-<br />ciona y aplica tu cashback disponible.
    </div>
  </div>

  <div className={styles.step}>
    <div className={styles.number}>4</div>
    <div className={styles.text}>
      Elige cómo pagar el monto restante (el cashback ya estará aplicado).
    </div>
  </div>
</div>
        )}

        {activeTab === "profile" && (
          <div className={styles.popupContentSection}>
            <DynamicForm  formSchema={formData} />
          </div>
        )}
      </div>
    </div>
          :
          <div className={styles.popupMain}>
                    <button className={styles.popupCloseButton} onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-x-icon lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
            <div className={styles.popupHeader}>Mi Cashback <img width={80} src="https://cloemx.vtexassets.com/arquivos/cloe.png"></img></div>
            <div className={styles.popupBackgroundBlack}>¡Hola! Consulta tu saldo aquí             <span className={styles.popupPointsRedirect}><Link to="/login" className="c-on-base">Inicia sesión</Link></span>
</div>
  <div className={styles.benefitsTabs}>
        <div
          className={activeTab === "cashback" ? styles.tabActive : styles.tabInactive}
          onClick={() => setActiveTab("cashback")}
        >
          Cashback
        </div>

        <div
          className={activeTab === "benefits" ? styles.tabActive : styles.tabInactive}
          onClick={() => setActiveTab("benefits")}
        >
          Más beneficios
        </div>
      </div>
           <div className={styles.benefitsContent}>
        {activeTab === "cashback" && (
          <>
            <button className={styles.buttonOutline}>EN LÍNEA</button>
            <div className={styles.discount}>
              <span className={styles.discountPercentage}>20%</span>
              <p>En cada compra</p>
            </div>

            <button className={styles.buttonOutline}>EN TIENDA</button>
            <div className={styles.bonusContainer}>
              <p>Recibe hasta</p>
              <span className={styles.bonusAmount}>600 MXN</span>
              <p>de bono</p>
              <small>al registrarte durante tu compra.</small>
            </div>
          </>
        )}

        {activeTab === "benefits" && (
         <>
                    <button className={styles.buttonOutline}>PROMOCIONES</button>
            <div className={styles.discount}>
              <span className={styles.discountPercentage}><img src="https://cloemx.vtexassets.com/assets/vtex.file-manager-graphql/images/baae65cb-3c0c-47f6-97c2-e39792e9696e___5c0ebced45d14fcedeca682d5af994e3.png"></img></span>
              <p>Por tu cumpleaños al
completar tu registro</p>
            </div>
             <button className={styles.buttonOutline}>ACCESO A PREVENTAS</button>
            <div className={styles.discount}>
              <span className={styles.discountPercentage}><img src="https://cloemx.vtexassets.com/assets/vtex.file-manager-graphql/images/0db998a4-4b08-454b-996c-f7caff5e64c3___2690226783ef403846153980d916cc6e.png"></img></span>
              <p>En cada compra</p>
            </div></>
        )}
      </div>

            <div className={styles.terms}>
              <small>Consulta términos y condiciones aquí</small>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default function RewardsWidget() {
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <div className={styles.widgetContainer}>
      <RewardsPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
      <RewardsButton onClick={() => setPopupOpen((prev) => !prev)} />
    </div>
  )
}
