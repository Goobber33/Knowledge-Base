import { useState } from "react";
import logo from "../../assets/images/KeelWorksLogo.png";
import "./TermsOfService.css";

export default function TermsOfService() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="main">
        <div>
          <img src={logo} alt="KeelWorks Logo" className="logo" />
        </div>
        <div className="content">
          <div className="main-Content">
            <div className="heading">
              <h1>KeelWorks Terms of Service</h1>
            </div>
            <div className="terms">
              <p>
                By accessing and using the App, you agree to comply with and be
                bound by the following Terms of Service. Please read these terms
                carefully before using the App.
              </p>
              <h1>User Conduct</h1>
              <p>
                &#8226; You agree to use the App only for lawful purposes and in
                accordance with these Terms of Service.
              </p>
              <p>
                &#8226; You shall not engage in any activity that could disrupt,
                damage, or interfere with the functioning of the App.
              </p>
              <h1>Intellectual Property</h1>
              <p>
                &#8226; The content, features, and functionality of the App are
                owned by KeelWorks and are protected by international copyright,
                trademark, and other intellectual property laws.
              </p>
              <h1>Limitation of Liability</h1>
              <p>
                &#8226; The App and its content are provided on an "as is"
                basis. We do not make any warranties, express or implied,
                regarding the accuracy, reliability, or availability of the App.
              </p>
              <p>
                &#8226; In no event shall KeelWorks be liable for any indirect,
                incidental, special, consequential, or punitive damages arising
                from your use of the App.
              </p>
              <h1>Governing Law</h1>
              <p>
                &#8226; These Terms of Service shall be governed by and
                construed in accordance with the laws of XXXX without regard to
                its conflict of law principles.
              </p>
              <h1 className="privacy">Privacy Policy:</h1>
              <h2>Information We Collect</h2>
              <p>
                &#8226; We collect certain information when you use the App,
                including your name, email address, and usage data. This
                information helps us improve the App's functionality and user
                experience.
              </p>
              <p>
                &#8226; We use cookies and similar technologies to enhance your
                browsing experience and gather usage information.
              </p>
              <h2>How We Use Your Information</h2>
              <p>
                &#8226; We use the collected information to provide and maintain
                the App's features, respond to user inquiries, and send relevant
                updates.
              </p>
              <p>
                &#8226; We may share anonymized usage data with third parties
                for analytical purposes.
              </p>
              <h2>Data Security</h2>
              <p>
                &#8226; We implement security measures to protect your personal
                information from unauthorized access, alteration, disclosure, or
                destruction. Despite our efforts, no method of transmission over
                the internet or electronic storage is completely secure, and we
                cannot guarantee absolute security.
              </p>
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="agreeCheckbox"
                  value="agree"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="agreeCheckbox">
                  By checking the box below, you confirm that you have read,
                  understood, and agree to the Terms of Service and Privacy
                  Policy of KeelWorks
                </label>
              </div>
            </div>
          </div>
          <div className="btn">
            <button className="dBtn">Decline</button>
            <button
              disabled={!isChecked}
              className={isChecked ? `checked` : `notChecked`}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
}