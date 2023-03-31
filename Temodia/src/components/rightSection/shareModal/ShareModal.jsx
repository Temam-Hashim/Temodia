// import { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from "../../postShare/PostShare";

function ShareModal({ modalOpened, setModalOpened }) {
  const theme = useMantineTheme();

  return (
    <>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        overlayOpacity={0.55}
        overlayBlur={3}
        size={"55%"}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
      >
        {/* Modal content */}
        <PostShare />
      </Modal>
    </>
  );
}

export default ShareModal;
