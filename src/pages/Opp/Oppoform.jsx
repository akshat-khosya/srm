import React from "react";

function Oppoform() {
  return (
    <>
      <div className="my-5 ">
        <h1 className="text-center">Create a new job</h1>
      </div>
      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 mx-auto">
            <form>
              <div class="mb-3 dropdown show">
                <label for="exampleInputEmail1" class="form-label">
                  Job title :-
                </label>
                <select class="form-select" aria-label="Default select example">
                  <option selected>Choose One</option>
                  <option value="1">Internship</option>
                  <option value="2">Training</option>
                  <option value="3">Job</option>
                  <option value="4">Project</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Field
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  name="phone"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Department
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  name="phone"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Link
                </label>
                <input
                  type="url"
                  class="form-control"
                  id="exampleInputEmail1"
                  name="phone"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Content
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  placeHolder="Write something here..."
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-3">
                <label class="form-label" for="customFile">
                  Upload file as PDF
                </label>
                <input type="file" class="form-control" id="customFile" />
              </div>
              <div className="mb-3">
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Oppoform;
