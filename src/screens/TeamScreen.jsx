import React, { useRef, useState, useEffect } from "react";
import yaml from "js-yaml";
import Modal from "react-modal";

import bubbles2 from "../assets/bubbles2.png";
import close from "../assets/close.png";
import teamData from "../data/team.yml";

Modal.setAppElement("#root");

export const TeamScreen = () => {
  const [team, setTeam] = useState([]);
  const [activeBio, setActiveBio] = useState(null);
  const [bioModalOpen, setBioModalOpen] = useState(false);

  useEffect(() => {
    fetch(teamData)
      .then((teamResponse) => { return teamResponse.text() })
      .then((teamText) => {
        setTeam(yaml.load(teamText));
      })
  }, []);

  const viewBio = (teamMember) => {
    setActiveBio(teamMember);
    setBioModalOpen(true);
  }

  const closeBioModal = () => {
    setBioModalOpen(false);
    setActiveBio(null);
  }

  const renderTeamMember = (teamMemberData) => {
    return (
      <div className="team-member" key={`${teamMemberData.name}`}>
        <img className="team-member-photo" src={require(`../assets/team-photos/${teamMemberData.image}`)} alt="team-member-picture" />
        <p className="name">{teamMemberData.name}</p>
        <p className="title">{teamMemberData.title}</p>
        <div className="actions">
          <div className="button inverted view-bio" onClick={() => { viewBio(teamMemberData); }}>
            <p className="button-text">View Bio</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="screen team-screen">
      <Modal
        className="bio-modal"
        isOpen={bioModalOpen}
        onAfterOpen={() => {}}
        onRequestClose={closeBioModal}
        contentLabel="Team Member Modal">
        {activeBio ? (
          <div className="team-member">
            <img className="team-member-photo" src={require(`../assets/team-photos/${activeBio?.image}`)} alt="team-member-picture" />
            <p className="name">{activeBio?.name}</p>
            <p className="title">{activeBio?.title}</p>
            {activeBio.bio.split("\\n\\n").map((bioSection, index) => {
              return ( <p className="bio" key={`bio-section-${index}`}>{bioSection}</p> )
            })}
          </div>

        ) : (<></>)}
        <img src={close} className="close-modal" onClick={closeBioModal} />
      </Modal>
      {/* <div className="section banner-section">
        <div className="text-content">
          <p className="section-title">Team</p>
          <p className="section-description">Discover experienced <span className="emphasis">biotech professionals and advisory board members</span>, who are dedicated to driving innovation and success in the industry.</p>
        </div>
        <div className="flex-spacer" />
        <img src={bubbles2} alt="research logo" className="section-image" />
      </div> */}

      <div className="section team-section core-team">
        <div className="team-members">
          {team.filter((teamMember) => { return !teamMember.advisory_board }).map((teamMember) => {
            return renderTeamMember(teamMember);
          })}
        </div>
      </div>

      <div className="section team-section advisory-board">
        <h2 className="advisory-board-title">Advisory Board</h2>
        <div className="team-members">
          {team.filter((teamMember) => { return teamMember.advisory_board }).map((teamMember) => {
            return renderTeamMember(teamMember);
          })}
        </div>
      </div>
    </div>
  )

}
