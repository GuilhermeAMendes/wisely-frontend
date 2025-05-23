// External Libraries
import React, { useRef } from "react";

// Components
import { Navigation } from "@components/structure/Navigation";
import { DirectoriesList } from "./sections/DirectoriesList";

<<<<<<< Updated upstream
// Styles
import { Container, PageContent, TextContainer, Wrapper } from "./styles";
=======
//Hooks
>>>>>>> Stashed changes
import { useDirectories } from "./hooks/useDirectories";
import { useRecentDirectories } from "./hooks/useRecentDirectories";
import { Typography } from "@components/tookit/Typography";
import { CreateFolder } from "./components/CreateFolder";

// Styles
import { Container, PageContent } from "./styles";
import { useModalContext } from "@contexts/ModalContext";
import { ModalMethods } from "@components/tookit/Modal/types";
import { Modal } from "@components/tookit/Modal";

export const Home: React.FC = () => {
  const { directories } = useDirectories();
  const { recentDirectoriesAccessed } = useRecentDirectories();

<<<<<<< Updated upstream
=======
  if (directories && recentDirectoriesAccessed) {
    console.log(
      `diretórios: ${directories}\nacessados recentemente: ${recentDirectoriesAccessed}`
    );
  }

  const { openModal } = useModalContext();
  const modalRef = useRef<ModalMethods>(null);

  const handleOpen = () => {
    openModal();
    modalRef.current?.open();
  };

>>>>>>> Stashed changes
  return (
    <Container>
      <Navigation />

      <PageContent>
<<<<<<< Updated upstream
        <Wrapper>
          <TextContainer>
            <img src="/plus-circle.svg" />
            <Typography $variant="p" fontWeight="bold">
              Create new directory
            </Typography>
          </TextContainer>

          <CreateFolder onClick={() => console.log("opa")} />
        </Wrapper>

        <Wrapper>
          <TextContainer>
            <img src="/clock.svg" />
            <Typography $variant="p" fontWeight="bold">
              Recent accesses
            </Typography>
          </TextContainer>

          <DirectoriesList
            directories={recentDirectoriesAccessed}
            variant="recent-access"
          />
        </Wrapper>

        <Wrapper>
          <TextContainer>
            <Typography $variant="p" fontWeight="bold">
              All directories
            </Typography>
          </TextContainer>

          <DirectoriesList directories={directories} variant="all" />
        </Wrapper>
=======
        <DirectoriesList />
        <div>
          <>
            <button onClick={handleOpen}>Abrir Modal</button>

            <Modal title="teste" ref={modalRef}>
              <p>Conteúdo do Modal</p>
            </Modal>
          </>
        </div>
        <div id="portal-root"></div>
>>>>>>> Stashed changes
      </PageContent>
    </Container>
  );
};
