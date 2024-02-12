import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
export default function Profile() {
  const [view, setView] = useState("profile");
  const { user, userDispatch } = useAuth();
  const [open, setOpen] = useState(false);
  const [buttonType, setButtonType] = useState("add");
  const [address, setAddress] = useState({
    name: "",
    houseNo: "",
    area: "",
    landmark: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });

  const handleAddressInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newAddress = { ...address, [name]: e.target.value };
    setAddress(newAddress);
  };

  const handleAdressAdd = (e) => {
    e.preventDefault();
    if (
      !address.name ||
      !address.houseNo ||
      !address.area ||
      !address.pincode ||
      !address.state ||
      !address.country ||
      !address.city
    ) {
      toast({
        message: `Please enter complete address`,
      });
    }
    userDispatch({ type: "ADDRESS", payload: [...user.address, address] });
    setOpen(false);
    toast.success(`Address added successfully !!`);
    setAddress({
      name: "",
      houseNo: "",
      area: "",
      landmark: "",
      city: "",
      pincode: "",
      state: "",
      country: "",
    });
  };

  const handleAdressUpdate = (e) => {
    e.preventDefault();
    if (
      !address.name ||
      !address.houseNo ||
      !address.area ||
      !address.pincode ||
      !address.state ||
      !address.country ||
      !address.city
    ) {
      toast({
        message: `Please enter complete address`,
      });
    }
    user.address[address.id] = address;
    userDispatch({ type: "ADDRESS", payload: [...user.address] });
    setOpen(false);
    toast.success(`Address added successfully !!`);
    setAddress({
      name: "",
      houseNo: "",
      area: "",
      landmark: "",
      city: "",
      pincode: "",
      state: "",
      country: "",
    });
  };
  const handleAddressDelete = (id) => {
    const newAddressArray = user.address.filter((addr, idx) => idx != id);
    userDispatch({ type: "ADDRESS", payload: [...newAddressArray] });
    toast.success(`Address deleted successfully !!`);
  };
  const handleDummyAddress = (e) => {
    e.preventDefault();

    const dummyAddress = {
      name: "John Doe",
      houseNo: "125",
      area: "Akshya Nagar 1st Block, Rammurthy nagar",
      landmark: "1st Cross",
      city: "Bangalore",
      state: "Karnataka",
      pincode: 560016,
      country: "India",
    };
    setAddress(dummyAddress);
  };

  const renderbuttons = () => {
    switch (buttonType) {
      case "add":
        return (
          <>
            <button
              className="btn signup-btn"
              action="submit"
              onClick={handleAdressAdd}
            >
              Add Address
            </button>
            <button
              className="btn signup-btn"
              action="submit"
              onClick={handleDummyAddress}
            >
              Use Dummy Address
            </button>
          </>
        );
      case "update":
        return (
          <>
            <button
              className="btn signup-btn"
              action="submit"
              onClick={handleAdressUpdate}
            >
              Update Address
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="profileblock-container">
        <div className="profile-address-btns">
          <button
            className="btn profile-btn"
            onClick={() => setView("profile")}
          >
            Profile
          </button>
          <button
            className="btn address-btn"
            onClick={() => setView("address")}
          >
            Adresses
          </button>
        </div>
        <div className="profile-info-container">
          {view === "profile" ? (
            <div>
              <h2>
                <span>Name : </span>
                {`${user.firstName} ${user.lastName}`}
              </h2>
              <h3>
                <span>Email : </span>
                {`${user.email}`}
              </h3>
            </div>
          ) : (
            <div>
              <button
                className="btn add-address-btn"
                onClick={() => {
                  setButtonType("add");
                  setOpen(true);
                }}
              >
                Add Address +
              </button>
              {open ? (
                <div className="address-container">
                  <form className="form address-popup">
                    <span
                      className="material-icons-outlined close-icon"
                      onClick={() => setOpen(false)}
                    >
                      close
                    </span>
                    <h2>
                      {buttonType === "add" ? "Add Address" : "Update Address"}
                    </h2>

                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={address.name}
                      onChange={(e) => handleAddressInput(e)}
                    />
                    <input
                      type="text"
                      name="houseNo"
                      id="houseNo"
                      placeholder="Flat, House no., Building, Apartment"
                      value={address.houseNo}
                      onChange={(e) => handleAddressInput(e)}
                    />
                    <input
                      type="text"
                      name="area"
                      id="area"
                      placeholder="Area, Street, Sector, Village"
                      value={address.area}
                      onChange={(e) => handleAddressInput(e)}
                    />
                    <input
                      type="text"
                      name="landmark"
                      id="landmark"
                      placeholder="Landmark E.g. near apollo hospital"
                      value={address.landmark}
                      onChange={(e) => handleAddressInput(e)}
                    />
                    <input
                      type="number"
                      name="pincode"
                      id="pincode"
                      placeholder="6 digits Pincode"
                      value={address.pincode}
                      onChange={(e) => handleAddressInput(e)}
                    />
                    <input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="State"
                      value={address.state}
                      onChange={(e) => handleAddressInput(e)}
                    />
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                      value={address.city}
                      onChange={(e) => handleAddressInput(e)}
                    />
                    <input
                      type="text"
                      name="country"
                      id="country"
                      placeholder="Country"
                      value={address.country}
                      onChange={(e) => handleAddressInput(e)}
                    />
                    {renderbuttons()}
                    {/* <button
                      className="btn signup-btn"
                      action="submit"
                      onClick={handleAdressAdd}
                    >
                      Add Address
                    </button>
                    <button
                      className="btn signup-btn"
                      action="submit"
                      onClick={handleDummyAddress}
                    >
                      Use Dummy Address
                    </button> */}
                  </form>
                </div>
              ) : null}
              {user.address.length ? (
                <div>
                  {user?.address.map((addr, index) => (
                    <div className="address-card">
                      <div className="address-info">
                        <h3>{`${addr.name}`}</h3>
                        <p>{`${addr.houseNo}, ${addr.area}, ${
                          addr.landmark || ""
                        }`}</p>
                        <p>
                          <strong>
                            {`${addr.city}, ${addr.state} - ${addr.pincode}, 
                      ${addr.country}`}
                          </strong>
                        </p>
                      </div>
                      <div className="address-card-icons">
                        <span
                          class="material-icons-outlined"
                          onClick={() => {
                            setButtonType("update");
                            setOpen(true);
                            setAddress({ ...addr, id: index });
                          }}
                        >
                          edit
                        </span>
                        <span
                          class="material-icons-outlined"
                          onClick={() => {
                            handleAddressDelete(index);
                          }}
                        >
                          delete
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <h2>No address to display!</h2>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
