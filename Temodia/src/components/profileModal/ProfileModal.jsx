import { useState } from "react";
import { Modal, Button, Group, useMantineTheme } from "@mantine/core";

function ProfileModal({ modelOpened, setModalOpened }) {
  const theme = useMantineTheme();
  return (
    <>
      <Modal
        opened={modelOpened}
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
        <form action="" className="info-form">
          <h3>Your info</h3>
          <div>
            <input
              type="text"
              className="info-input"
              name="firstName"
              placeholder="First Name"
            />
            <input
              type="text"
              className="info-input"
              name="lastName"
              placeholder="Last Name"
            />
          </div>
          <div>
            <input
              type="text"
              className="info-input"
              name="email"
              placeholder="Email Address"
            />
          </div>

          <div>
            <input
              type="text"
              className="info-input"
              name="LivesIn"
              placeholder="Lives In"
            />
            <input
              type="text"
              className="info-input"
              name="country"
              placeholder="Country"
            />
          </div>
          <div>
            <input
              type="text"
              className="info-input"
              name="relationship"
              placeholder="Relationship Status"
            />
            <input
              type="text"
              className="info-input"
              name="hobbies"
              placeholder="Hobbies"
            />
          </div>
          <div>
            <input
              type="text"
              className="info-input"
              name="worksAt"
              placeholder="Works At"
            />
          </div>
          <div>
            Profile Image
            <input type="file" name="profileImage" />
            Cover Image
            <input type="file" name="coverImage" />
          </div>
          <button className="button info-button">Update</button>
        </form>
      </Modal>
    </>
  );
}
export default ProfileModal;
