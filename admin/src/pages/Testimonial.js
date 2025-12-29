import Sidebar from "../components/Sidebar";
import { useContext, useState, useEffect } from "react";
import StoreContext from "../context/StoreContext";
import { toast } from "react-toastify";

const Testimonial = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    description: "",
    company: "",
    image: null,
  });
  const { errors, setErrors, fetchProducts } = useContext(StoreContext);
  const [testimonials, setTestimonials] = useState([]);
  const [editid, setEditid] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const { name, description, company, image } = formdata;
    if (!name) return "Name is Required";
    if (!description) return "Description is Required";
    if (!company) return "Company Name is Required";
    if (!editid && !image) return "Image is Required";
    return null;
  };

    const load = () => {
  fetchProducts("/api/testimonial/gettestimonial", setTestimonials);
};

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    const validationErrors = validate();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      const FormDataToSend = new FormData();
      FormDataToSend.append("name", formdata.name);
      FormDataToSend.append("description", formdata.description);
      FormDataToSend.append("company", formdata.company);
      if (formdata.image) {
  FormDataToSend.append("image", formdata.image);
}


      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/testimonial/addtestimonial`,
        {
          method: "POST",
          body: FormDataToSend,
        }
      );

      const json = await response.json();
      if (!response.ok) {
        setErrors(json.message || "Failed to add Testimonial");
        return;
      }

      toast.success(json.message || "Testimonial Added Successfull!");
      load();
      setFormdata({ name: "", description: "", company: "", image: null });
      setErrors(null);
      setPreview(null);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

 

  


  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrors(null);

    const FormDataToSend = new FormData();
    FormDataToSend.append("name", formdata.name);
    FormDataToSend.append("description", formdata.description);
    FormDataToSend.append("company", formdata.company);
    if (formdata.image) {
      FormDataToSend.append("image", formdata.image);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/testimonial/update/${editid}`,
        {
          method: "PUT",
          body: FormDataToSend,
        }
      );

      const data = await response.json()
      if (!response.ok) {
        setErrors(data.message || "Failed to update Testimonial");
        return;
      }

      setEditid(null);
      setFormdata({
        name: "",
        description: "",
        company: "",
        image: null,
      });
      setPreview(null);
      toast.success("Testimonial Updated Successfully");
      load();

      setErrors(null);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleEditClick = (testimonial) => {
    setEditid(testimonial._id);

    setFormdata({
      name: testimonial.name,
      description: testimonial.description,
      company: testimonial.company,
      image: null,
    });
    setPreview(
      `${process.env.REACT_APP_API_URL}/${testimonial.image}?t=${Date.now()}`
    );
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/testimonial/delete/${id}`,
        { method: "DELETE" }
      );

      const json = await response.json();

      if (!response.ok) {
        setErrors(json.message || "Failed to delete technology");
        return;
      }

      toast.success(json.message || "Testimonial Deleted Successfully!");
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
        style={{
          background: "#f4f6fb",
          minHeight: "100vh",
        }}
      >
        {/* Page Title */}
        <h3 className="fw-bold mb-4">Add Testimonial</h3>

        {/* ====================== PROMO FORM ====================== */}
        <div className="bg-white p-4 rounded-4 shadow-sm mb-5">
          <h5 className="fw-bold mb-3">Testimonial Details</h5>
          {errors && <div className="alert alert-danger">{errors}</div>}

          <form onSubmit={editid ? handleUpdate : handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">
                  Testimonial Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formdata.name}
                  placeholder="Enter promo name"
                  onChange={handleChange}
                />
              </div>

              

              <div className="col-md-6 mb-3">
                <label htmlFor="company" className="form-label">
                  Client Comapny Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  name="company"
                  value={formdata.company}
                  placeholder="Enter promo name"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="description" className="form-label">
                  Testimonial Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  rows="4"
                  name="description"
                  value={formdata.description}
                  placeholder="Enter description"
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    setFormdata({
                      ...formdata,
                      image: file,
                    });

                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                  placeholder="Enter icon name"
                />
              </div>

              {preview && (
                <div className="mt-3">
                  <p className="fw-semibold">Image Preview:</p>
                  <img
                    src={preview}
                    alt="Preview"
                    className="img-fluid rounded"
                    style={{ maxHeight: "150px" }}
                  />
                </div>
              )}
            </div>

           <button type="submit" className="btn btn-primary mt-2">
  {editid ? "Update" : "Submit"}
</button>

          </form>
        </div>

        <h4 className="fw-bold mb-3">Available Products</h4>

        <div className="row g-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="col-md-4 col-12">
              <div className="bg-white p-3 rounded-4 shadow-sm h-100">
                <div className="rounded-4 bg-light p-3 text-center">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/${
                      testimonial.image
                    }?t=${Date.now()}`}
                    alt={testimonial.name}
                    className="img-fluid rounded"
                    style={{
                      height: "150px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                </div>

                <h5 className="fw-bold mt-3 mb-1">{testimonial.name}</h5>
                <p className="text-primary fw-semibold mb-1">
                  {testimonial.company}
                </p>

                <p className="text-muted small">{testimonial.description}</p>

                <div className="d-flex gap-2 mt-3">
                  <button
                    onClick={() => handleEditClick(testimonial)}
                    className="btn btn-primary btn-sm rounded-3"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteClick(testimonial._id)}
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

export default Testimonial;
