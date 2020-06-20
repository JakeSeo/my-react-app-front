import React, { useEffect, useState } from "react";

function FlashMessages(props) {
  return (
    <div className="floating-alerts">
      {props.messages.map((msg, index) => {
        var color = "alert-success";
        switch (msg.color) {
          case "red":
            color = "alert-danger";
        }
        return (
          <div key={index} className={"alert text-center floating-alert shadow-sm " + color}>
            {msg.message}
          </div>
        );
      })}
    </div>
  );
}

export default FlashMessages;
