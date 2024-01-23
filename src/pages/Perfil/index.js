import React, { useContext, useState, useRef, useEffect } from "react";
import { Col, Container, Row, ToastContainer } from "react-bootstrap";
import { format } from 'date-fns';
import { BiUserCircle } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";
import { useNavigate , useParams, Link  } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import PageContentContainer from "../../components/PageContentContainer";
import PageHeaderContainer from "../../components/PageHeaderContainer";
import BackButton from "../../components/VoltarButton";
import SubTitle from "../../components/SubTitle";
import ButtonComponent from "../../components/Button";
import { ButtonContainer, RoundedUserPhoto } from "./style";
import { ContainerWithSidebar } from "../../components/ContainerWithSidebar";
import { AuthenticationContext } from "../../services/context/AuthContext";
import { ModalComponent } from "../../components/Modal";
import fotoUsuario from "../../assets/img/fotoUsuario.png";

function Perfil({
  HandledarkMode,
  isDarkMode,
  decreaseFontSize,
  increaseFontSize,
  logOut,
}) {
  const { user } = useContext(AuthenticationContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const fileInput = useRef(null);
  const navigate = useNavigate();
  const { colaboradorId } = useParams();

  useEffect(() => {
    loadUserPhoto();
    loadCompanyName();
  }, []); 

  const loadCompanyName = () => {
    fetch(`http://35.184.203.56:8016/Colaborador/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch user details: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
      
        setCompanyName(data.empresas && data.empresas.length > 0 ? data.empresas[0].nomeEmpresa : 'N/A');
      })
      .catch(error => {
        console.error('Error while fetching user details:', error.message);
       
        setCompanyName('N/A');
      });
  };

  const loadUserPhoto = () => {
    fetch(`http://35.184.203.56:8016/colaborador-photo/${user.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch photo: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data.photos);
        if (data.photos && data.photos.length > 0) {
          setUserPhoto(`data:image/png;base64,${data.photos[0].photo}`);
        } else {
          console.error('No photos found for the user');
          setUserPhoto(fotoUsuario);
        }
      })
      .catch(error => {
        console.error('Error while fetching user photo:', error.message);
        setUserPhoto(fotoUsuario);
      });
  };

  const handleConfirmClick = () => {
    setShowConfirmModal(true);
  };

  const handleImageClick = () => {
    fileInput.current.click();
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

    
      if (userPhoto !== fotoUsuario) {
        
        fetch(`http://35.184.203.56:8016/colaborador-photo/${user.id}/editPhoto`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to update photo: ${response.status} ${response.statusText}`);
            }
            return response.json();
          })
          .then(data => {
            console.log("Photo updated successfully", data);
            setUserPhoto(`data:image/png;base64,${data.photo}`);
          })
          .catch(error => {
            console.error('Error while updating user photo:', error.message);
          })
          .finally(() => {
            
            loadUserPhoto();
          });
      } else {
      
        fetch(`http://35.184.203.56:8016/colaborador-photo/${user.id}/uploadPhoto`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: formData,
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to upload photo: ${response.status} ${response.statusText}`);
            }
            return response.json();
          })
          .then(data => {
            console.log("Photo uploaded successfully", data);
            setUserPhoto(`data:image/png;base64,${data.photo}`);
          })
          .catch(error => {
            console.error('Error while uploading user photo:', error.message);
          })
          .finally(() => {
           
            loadUserPhoto();
          });
      }
    }
  };

  const adicionarCompetencia = (colaborador) => {
    navigate(`/competenciaColaborador/${user.id}`, {
      state: {
        nome: colaborador.fullName,
      },
    });
  };

  function notify(type) {
    switch (type) {
      case "success":
        return toast.success("Success Notification !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      default:
        break;
    }
  }

  return (
    <ContainerWithSidebar
      increaseFontSize={increaseFontSize}
      decreaseFontSize={decreaseFontSize}
      HandledarkMode={HandledarkMode}
      isDarkMode={isDarkMode}
      logOut={logOut}
    >
      <PageContainer>
        <PageHeaderContainer
          title="Perfil"
          icon={<BiUserCircle title="Perfil" />}
        />
        <PageContentContainer>
          <Container>
            <div style={{ textAlign: "center", marginTop: "-12px" }}>
              <RoundedUserPhoto 
                src={userPhoto}
                alt="User's profile"
                onClick={handleImageClick}
              />
              <input
                type="file"
                ref={fileInput}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div>
            <SubTitle subtitle="Dados Pessoais" />
            <Row className="mb-3">
              <Col xs={12} md={3}>
                <strong>Nome</strong>
                <p>{user.fullName}</p>
              </Col>
              <Col xs={12} md={3}>
                <strong>Data de Nascimento</strong>
                <p>{format(new Date(user.birthDate), 'dd/MM/yyyy')}</p>
              </Col>
              <Col xs={12} md={3}>
                <strong>Telefone</strong>
                <p>{user.phone !== 'null' ? (user.phone ? user.phone.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3") : '-') : '-'}</p>
              </Col>
              <Col xs={12} md={3}>
                <strong>Email</strong>
                <p>{user.corporativeEmail}</p>
              </Col>
            </Row>
            <SubTitle subtitle="Dados Empresariais" />
            <Row className="mb-3">
              <Col xs={12} md={3}>
                <strong>Data de Admissão</strong>
                <p>{format(new Date(user.admissionDate), 'dd/MM/yyyy')}</p>
              </Col>
              <Col xs={12} md={3}>
              <strong>
                  <Link
                    to={`/addEmpresaColab/${user.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Empresa <CiEdit color="var(--verde-primario)" />
                  </Link>
                </strong>
                <p>{companyName}</p>
              </Col>
            </Row>
            <SubTitle subtitle="Outras Opções" />
            <Row>
              <Col xs={12} md={3}>
              <strong
                  onClick={() => adicionarCompetencia({ id:user.id})}
                  style={{ cursor: "pointer" }}
                >
                  Visualizar Competências
                </strong>
              </Col>
            </Row>
          </Container>
          <ButtonContainer>
            <BackButton
              size="18rem"
              bgColor="var(--cinza-primario)"
              textColor=""
            ></BackButton>
          </ButtonContainer>
        </PageContentContainer>
      </PageContainer>
      <ToastContainer />
    </ContainerWithSidebar>
  );
}

export default Perfil;
