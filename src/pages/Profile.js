import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const [view, setView] = useState("profile");
  const { user } = useAuth();
  return (
    <>
      <div>
        <button className="btn profile-btn" onClick={() => setView("profile")}>
          Profile
        </button>
        <button className="btn address-btn" onClick={() => setView("address")}>
          Adresses
        </button>
        {view === "profile" ? (
          <div>
            <h2>{`${user.firstName} ${user.lastName}`}</h2>
          </div>
        ) : (
          <div>
            {user.address.length ? (
              <div>
                {user?.address.map((addr, index) => (
                  <div>
                    <h3>{`${addr.name}`}</h3>
                    <p>{`${addr.houseNo}, ${addr.area}, ${addr.lanmark}`}</p>
                    <p>
                      <strong>
                        {`${addr.city}, ${addr.state} - ${addr.pincode}, $
                      {addr.country}`}
                      </strong>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <h2>No address to display!</h2>
            )}
          </div>
        )}
      </div>
    </>
  );
}
