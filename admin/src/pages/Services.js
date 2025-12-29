import Sidebar from "../components/Sidebar";
import { useContext, useState, useEffect } from "react";
import StoreContext from "../context/StoreContext";
import { toast } from "react-toastify";
import { useRef } from "react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [editid, setEditid] = useState(null);
  const [existingFiles, setExistingFiles] = useState({
    brochure: null,
    video: null,
    images: [],
  });
  const [removedImages, setRemovedImages] = useState([]);
  const [formdata, setFormdata] = useState({
    shortname: "",
    longname: "",
    brochure: null,
    video: "",
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoModal, setVideoModal] = useState({ show: false, link: "" });

  const { errors, setErrors, fetchProducts } = useContext(StoreContext);
  const brochureRef = useRef(null);
  const imagesRef = useRef(null);

  /* -------------------- INPUT HANDLERS -------------------- */

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "images") {
      const selectedFiles = Array.from(files);

      setFormdata((prev) => {
        const newImages = [...prev.images, ...selectedFiles];

        if (newImages.length > 4) {
          toast.error("You can upload only 4 images");
          return prev;
        }

        return { ...prev, images: newImages };
      });

      const previews = selectedFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...previews]);

      e.target.value = null;
    } else {
      setFormdata((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const removeImage = (index) => {
    setFormdata((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };


  const validate = () => {
    if (!formdata.shortname || !formdata.longname) {
      return "All Fields Are Required";
    }

    if (!editid) {
      if (!formdata.brochure || formdata.images.length === 0) {
        return "Brochure and Images are required";
      }
    }

    return null;
  };

  /* -------------------- LOAD SERVICES -------------------- */

  const load = () => {
    fetchProducts("/api/services/getservices", setServices);
  };

  useEffect(() => {
    load();
  }, []);

  /* -------------------- EDIT -------------------- */

  const handleEditClick = (service) => {
    setEditid(service._id);

    setFormdata({
      shortname: service.shortname,
      longname: service.longname,
      brochure: null,
      video: service.video || "",
      images: [],
    });

    setExistingFiles({
      brochure: service.brochure || null,
      video: service.video || null,
      images: service.images || [],
    });

    setImagePreviews([]);
    setRemovedImages([]);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* -------------------- SUBMIT -------------------- */

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    const validationErrors = validate();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    try {
      const FormDataToSend = new FormData();
      FormDataToSend.append("shortname", formdata.shortname);
      FormDataToSend.append("longname", formdata.longname);
      FormDataToSend.append("brochure", formdata.brochure);
      FormDataToSend.append("video", formdata.video); // send video link

      formdata.images.forEach((img) => FormDataToSend.append("images", img));

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/services/addservice`,
        {
          method: "POST",
          body: FormDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.message || "Failed to add Service!");
        return;
      }

      toast.success(data.message || "Service Added Successfully!");
      load();

      // setFormdata({
      //   shortname: "",
      //   longname: "",
      //   brochure: null,
      //   video: "",
      //   images: [],
      // });
      setFormdata({
  shortname: "",
  longname: "",
  brochure: null,
  video: "",
  images: [],
});
setImagePreviews([]);
setErrors("");

// 🔥 CLEAR FILE INPUTS
if (brochureRef.current) brochureRef.current.value = "";
if (imagesRef.current) imagesRef.current.value = "";

      setImagePreviews([]);
      setErrors("");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const removeExistingImage = (index) => {
    const removedImg = existingFiles.images[index];
    setRemovedImages((prev) => [...prev, removedImg]);
    setExistingFiles((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  /* -------------------- UPDATE -------------------- */

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrors("");

    try {
      const FormDataToSend = new FormData();
      FormDataToSend.append("shortname", formdata.shortname);
      FormDataToSend.append("longname", formdata.longname);
      FormDataToSend.append("video", formdata.video); // send video link

      if (formdata.brochure) FormDataToSend.append("brochure", formdata.brochure);

      formdata.images.forEach((img) => FormDataToSend.append("images", img));
      existingFiles.images.forEach((img) => FormDataToSend.append("existingImages", img));
      removedImages.forEach((img) => FormDataToSend.append("removedImages", img));

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/services/update/${editid}`,
        {
          method: "PUT",
          body: FormDataToSend,
        }
      );

      const json = await response.json();
      if (!response.ok) {
        toast.error(json.message || "Update failed");
        return;
      }

      toast.success("Service Updated Successfully!");
      load();

      setFormdata({ shortname: "", longname: "", brochure: null, video: "", images: [] });
      setExistingFiles({ brochure: null, video: null, images: [] });
      setRemovedImages([]);
      setImagePreviews([]);
      setEditid(null);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  /* -------------------- DELETE -------------------- */

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/services/delete/${id}`, {
        method: "DELETE",
      });

      const json = await response.json();
      if (!response.ok) {
        toast.error(json.message || "Delete failed");
        return;
      }

      toast.success("Service deleted successfully");
      load();
    } catch {
      toast.error("Something went wrong");
    }
  };

  /* -------------------- VIDEO MODAL -------------------- */

  const openVideo = (link) => setVideoModal({ show: true, link });
  const closeVideo = () => setVideoModal({ show: false, link: "" });

  /* -------------------- JSX -------------------- */

  return (
    <>
      <Sidebar />

      <div className="p-4 promo-container" style={{ background: "#f4f6fb", minHeight: "100vh" }}>
        <h3 className="fw-bold mb-4">Add Promo</h3>

        <div className="bg-white p-4 rounded-4 shadow-sm mb-5">
          <h5 className="fw-bold mb-3">Promo Details</h5>
          {errors && <div className="alert alert-danger">{errors}</div>}

          <form onSubmit={editid ? handleUpdate : handleOnSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Service Name [Short]</label>
                <input
                  type="text"
                  className="form-control"
                  name="shortname"
                  value={formdata.shortname}
                  onChange={handleOnChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Service Name [Long]</label>
                <input
                  type="text"
                  className="form-control"
                  name="longname"
                  value={formdata.longname}
                  onChange={handleOnChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Brochure</label>
                <input type="file" className="form-control" name="brochure" onChange={handleFileChange} ref={brochureRef} />
                {editid && existingFiles.brochure && (
                  <a
                    href={`${process.env.REACT_APP_API_URL}/${existingFiles.brochure}`}
                    target="_blank"
                    rel="noreferrer"
                    className="d-block mt-1 text-primary small"
                  >
                    View Existing Brochure
                  </a>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Video (Embed Link)</label>
                <input
                  type="text"
                  className="form-control"
                  name="video"
                  value={formdata.video || ""}
                  onChange={handleOnChange}
                  placeholder="Paste YouTube or Vimeo link here"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Images</label>
                <input type="file" className="form-control" name="images" multiple onChange={handleFileChange} ref={imagesRef} />

                {editid && existingFiles.images.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {existingFiles.images.map((img, index) => (
                      <div key={index} className="position-relative">
                        <img
                          src={`${process.env.REACT_APP_API_URL}/${img}`}
                          width="90"
                          height="70"
                          className="rounded-3"
                          style={{ objectFit: "cover" }}
                          alt=""
                        />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                          style={{ padding: "2px 6px", fontSize: "12px" }}
                          onClick={() => removeExistingImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {imagePreviews.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {imagePreviews.map((src, index) => (
                      <div key={index} className="position-relative">
                        <img src={src} width="90" height="70" className="rounded-3" style={{ objectFit: "cover" }} />
                        <button
                          type="button"
                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                          style={{ padding: "2px 6px", fontSize: "12px" }}
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              {editid ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        <h4 className="fw-bold mb-3">Available Services</h4>

        <div className="row g-4">
          {services.map((service) => (
            <div key={service._id} className="col-md-4 col-12">
              <div className="bg-white p-3 rounded-4 shadow-sm h-100">
                {/* IMAGE GALLERY */}
                <div className="d-flex gap-2 flex-wrap mb-2">
                  {service.images?.map((img, i) => (
                    <img
                      key={i}
                      src={`${process.env.REACT_APP_API_URL}/${img}`}
                      alt=""
                      className="rounded-3"
                      width="80"
                      height="70"
                      style={{ objectFit: "cover" }}
                    />
                  ))}
                </div>

                <h5 className="fw-bold mt-2">{service.shortname}</h5>
                <p className="text-muted small">{service.longname}</p>

                <div className="d-flex gap-2 flex-wrap">
                  {service.brochure && (
                    <a
                      href={`${process.env.REACT_APP_API_URL}/${service.brochure}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      Brochure
                    </a>
                  )}
                  {service.video && (
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => openVideo(service.video)}
                    >
                      Play Video
                    </button>
                  )}
                </div>

                <div className="d-flex gap-2 mt-3">
                  <button onClick={() => handleEditClick(service)} className="btn btn-primary btn-sm rounded-3">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(service._id)} className="btn btn-danger btn-sm rounded-3">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ---------------- VIDEO MODAL ---------------- */}
        {videoModal.show && (
          <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={closeVideo}>
            <div className="modal-dialog modal-lg" role="document" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Video Preview</h5>
                  <button type="button" className="btn-close" onClick={closeVideo}></button>
                </div>
                <div className="modal-body">
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={videoModal.link}
                      title="Service Video"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Services;
