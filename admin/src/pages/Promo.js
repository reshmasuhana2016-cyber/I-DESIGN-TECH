import Sidebar from "../components/Sidebar";
import { useState, useContext, useEffect } from "react";
import StoreContext from "../context/StoreContext";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Promo = () => {
  const [formdata, setFormdata] = useState({ name: "", icon: "" });
  const { errors, setErrors, fetchProducts } = useContext(StoreContext);
  const [promos, setPromos] = useState([]);
  const [editid, setEditid] = useState(null);

  const validate = () => {
    const { name, icon } = formdata;
    if (!name) return "Name is Required";
    if (!icon) return "Icon iss Required";
    return null;
  };

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const load = () => {
  fetchProducts("/api/promos/getpromos", setPromos);
};


  useEffect(() => {
    load();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);
    // setSuccess("");

    const validationErrors = validate();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/api/promos/addpromo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.message || "Something went wrong!");
        return;
      }
      toast.success(data.message || "Promo Added Successfully!");
     load();
      setFormdata({ name: "", icon: "" });
      setErrors(null);
      // setSuccess("");
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // const {name, icon} = formdata;

    const validationErrors = validate();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/api/promos/update/${editid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.message || "Failed to Update Promo!");
        return;
      }
      toast.success(data.message || "Product Updated Successfully!");
     load();
      setFormdata({ name: "", icon: "" });
      setErrors(null);
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  const handleEditClick = (item) => {
    setEditid(item._id);
    setFormdata({ name: item.name, icon: item.icon });
  };

  const handleCancelEdit = () => {
    setEditid(null);
    setFormdata({ name: "", icon: "" });
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URI}/api/promos/delete/${id}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.message || "Failed to Delete Promo");
        return;
      }

      toast.success(data.message || "Promo Deleted Successfully!");
      load();
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  return (
    <>
      <Sidebar />

      <div
        className="p-4 promo-container"
        style={{
          background: "#f4f6fb",
          minHeight: "100vh",
        }}
      >
        {/* Page Title */}
        <h3 className="fw-bold mb-4">Add Promo</h3>

        {/* ====================== PROMO FORM ====================== */}
        <div className="bg-white p-4 rounded-4 shadow-sm mb-5">
          <h5 className="fw-bold mb-3">Promo Details</h5>

          {errors && <div className="alert alert-danger">{errors}</div>}

          <form onSubmit={editid ? handleUpdate : handleOnSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">
                  Promo Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter promo name"
                  value={formdata.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="icon" className="form-label">
                  Promo Icon
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="icon"
                  name="icon"
                  value={formdata.icon}
                  onChange={handleChange}
                  placeholder="Enter icon name"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              {editid ? "Update" : "Submit"}
            </button>
            {editid && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="btn btn-secondary mt-2 ms-2"
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* ====================== PRODUCTS SECTION ====================== */}
        <h4 className="fw-bold mb-3">Available Products</h4>

        <div className="row g-4">
          {promos.map((promo) => (
            <div key={promo._id} className="col-md-4 col-12">
              <div className="bg-white p-3 rounded-4 shadow-sm h-100">
                <h5 className="fw-bold mb-3">{promo.name}</h5>
                <div className="rounded-4 bg-light p-4 text-center">
                  <i className={`${promo.icon} fa-2x`}></i>
                </div>

                {/* <h5 className="fw-bold mt-3 mb-1">Website Designing</h5>
              <p className="text-muted small">
                High-quality UI/UX design service.
              </p> */}

                <div className="d-flex ">
                  <button
                    onClick={() => handleEditClick(promo)}
                    className="btn btn-primary btn-sm rounded-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(promo._id)}
                    className="btn btn-danger btn-sm rounded-3"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Promo;
