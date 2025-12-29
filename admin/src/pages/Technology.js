import { useState, useContext, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StoreContext from "../context/StoreContext";
import { toast } from "react-toastify";

const Technology = () => {
  const [formdata, setFormdata] = useState({ image: null });
  const { errors, setErrors, fetchProducts } = useContext(StoreContext);
  const [technologies, setTechnologies] = useState([]);
  const [editid, setEditid] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileRef = useRef();

  const validate = () => {
    if (!formdata.image) return "Image is required";
    return null;
  };

  

    const load = () => {
  fetchProducts("/api/technologies/gettechnologies", setTechnologies);
};


  useEffect(() => {
    load();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    const validationErrors = validate();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("image", formdata.image);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/technologies/addtechnology`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.message || "Failed to add technology");
        return;
      }

      toast.success(data.message || "Technology Added Successfully!");

      load();
      setFormdata({ image: null });
      setPreview(null);
      fileRef.current.value = "";
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleUpdateTechnology = async (e) => {
    e.preventDefault();
    setErrors(null);

     if (!formdata.image) {
    setErrors("Image is required for update");
    return;
  }

    try {
      
      const formDataToSend = new FormData();
      if (formdata.image) {
        formDataToSend.append("image", formdata.image);
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/technologies/update/${editid}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setErrors(json.message || "Failed to update technology");
        return;
      }

      toast.success(json.message || "Technology Updated Successfully!");

      load();
      setEditid(null);
      setFormdata({ image: null });
      setPreview(null);
      fileRef.current.value = "";
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

 const handleEditClick = (technology) => {
  setErrors(null);
  setEditid(technology._id);
  setFormdata({ image: null });
  setPreview(`${process.env.REACT_APP_API_URL}/${technology.image}`);
  fileRef.current.value = "";
};


  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/technologies/delete/${id}`,
        { method: "DELETE" }
      );

      const json = await response.json();

      if (!response.ok) {
        setErrors(json.message || "Failed to delete technology");
        return;
      }

      toast.success(json.message || "Technology Deleted Successfully!");
      load();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Sidebar />

      <div
        className="p-4 promo-container"
        style={{ background: "#f4f6fb", minHeight: "100vh" }}
      >
        <h3 className="fw-bold mb-4">
          {editid ? "Update Technology" : "Add Technology"}
        </h3>

        <div className="bg-white p-4 rounded-4 shadow-sm mb-5">
          <h5 className="fw-bold mb-3">Technology Details</h5>
          {errors && <div className="alert alert-danger">{errors}</div>}

          <form onSubmit={editid ? handleUpdateTechnology : handleOnSubmit}>
            <div className="mb-3">
              <label className="form-label">Technology Image</label>
              <input
                type="file"
                className="form-control"
                ref={fileRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFormdata({ image: file });

                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>

            {preview && (
              <div className="mb-3">
                <p className="fw-semibold mb-1">Preview</p>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                    border: "1px solid #ddd",
                    padding: "8px",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary">
              {editid ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        {/* ================= LIST ================= */}
        <h4 className="fw-bold mb-3">Available Technologies</h4>

        <div className="row g-4">
          {technologies.map((technology) => (
            <div key={technology._id} className="col-md-4 col-12">
              <div className="bg-white p-3 rounded-4 shadow-sm h-100">
                <div className="bg-light p-4 rounded-4 text-center">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${
                      technology.image
                    }?t=${Date.now()}`}
                    alt=""
                    style={{
                      width: "150px",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div className="d-flex gap-2 mt-3">
                  <button
                    onClick={() => handleEditClick(technology)}
                    className="btn btn-primary btn-sm rounded-3"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteClick(technology._id)}
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

export default Technology;
