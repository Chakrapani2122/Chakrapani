import streamlit as st
from PIL import Image
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

# Set the page configuration
st.set_page_config(
    page_title="Chakrapani Gajji",
    page_icon="src/assets/images/logo.png"  # Path to your logo image
)

# Load environment variables from .env file
load_dotenv()

# Set the title of the app
st.title("Chakrapani Gajji")

# About Me Section
st.header("About Me")

# Create a layout with two columns
col1, col2 = st.columns([3, 2])

with col1:
    st.write("""
    Data scientist with expertise in Machine Learning, AI, and Data Analytics. Currently pursuing a Master’s in Data Analytics at Kansas State University.
    Experienced in projects like Image Colorization with CNNs, Real-time Object Counting, and Sales Forecasting using Random Forest models. Proficient in Python, SQL, Tableau, and TensorFlow, with a strong background in soil data analysis, achieving 98% accuracy and improving workflow efficiency by 20%. Seeking opportunities to apply my skills in data-driven decision-making and innovative solutions.
    """)

with col2:
    image = Image.open("src/assets/images/photo2.jpeg")
    st.image(image, caption="Chakrapani Gajji", output_format="JPEG", width=400)  # Adjust the width as needed

# Details About Me Section
st.header("Details About Me")
st.write("""
- **First Name:** Chakrapani
- **Last Name:** Gajji
- **Phone:** +1(785)317-5938
- **Email:** [cgajji@ksu.edu](mailto:cgajji@ksu.edu)
- **Date of Birth:** August 21, 2002
- **LinkedIn:** [Chakrapani](https://www.linkedin.com/in/chakrapanigajji/)
- **GitHub:** [Chakrapani](https://github.com/Chakrapani2122)
- **Address:** 2020 Tunstall Cir Apt 24 Manhattan, Kansas 66502 United States of America.
""")

# Experience Section
st.header("Experience")
st.subheader("Graduate Research Assistant (Kansas State University)")
st.write("**August 2024- Present**")
st.write("""
- Managed and organized datasets of over 10,000 soil records, ensuring 98% data accuracy for soil research studies.
- Conducted statistical analyses on soil health, moisture, and fertility metrics, contributing to insights on soil treatment impacts.
- Enhanced data quality control processes, increasing research workflow efficiency by 20% through streamlined data management practices.
""")
st.subheader("Data Science Intern (Oasis Infobyte)")
st.write("**2023**")
st.write("""
- Developed machine learning models achieving up to 97% accuracy in automating tasks like email classification and marketing sales predictions.
- Optimized model-building pipeline, reducing execution time by 30% and improving forecast reliability.
""")

# Education Section
st.header("Education")
st.subheader("Kansas State University")
st.write("Master’s in Data Analytics (2024 - Expected 2025)")
st.write("GPA: 3.67/4.0")
st.write("""
I am currently pursuing a Master’s in Data Analytics at Kansas State University, with an expected graduation in December 2025. My studies emphasize advanced statistical modeling, machine learning, and big data analysis, providing me with the expertise to turn data into valuable insights. Through practical projects, I am gaining experience in data management, visualization, and predictive analytics, utilizing tools such as Python, SQL, and Tableau. This program has strengthened my ability to solve data-driven challenges and has prepared me to apply analytical solutions across various industries.
""")
st.write("Address: Manhattan, Kansas, USA 66502")
st.subheader("Sri Indu College of Engineering and Technology")
st.write("Bachelor’s in Computer Science Engineering (AI & ML, 2020 - 2024)")
st.write("Grade: 3.45/4.0")
st.write("""
I earned my Bachelor’s degree in Computer Science Engineering with a specialization in AI & ML from Sri Indu College of Engineering and Technology. During my studies, I developed a strong foundation in machine learning, data science, and programming, with an emphasis on applying AI to solve real-world problems. Through coursework, projects, and internships, I gained practical experience in data analysis and model development, preparing me to tackle complex challenges in data analytics and beyond.
""")
st.write("Address: Hyderabad, Telangana, India 501510")
st.subheader("SR Junior College")
st.write("MPC (Mathematics, Physics, Chemistry)")
st.write("2018 - 2020")
st.write("Grade: 97%")
st.write("Address: Hyderabad, Telangana, India.")
st.subheader("Jawahar Navodaya Vidyalaya")
st.write("Matriculation")
st.write("2013 - 2018")
st.write("Grade: 87%")
st.write("Address: Chalakurthy Camp, Nalgonda, Telangana, India.")

# Projects Section
st.header("Projects")

projects = [
    {
        "title": "VIVIDTONES",
        "description": "Implemented CNNs with pre-trained deep learning models to colorize grayscale images, achieving realistic color outputs.",
        "link": "https://drive.google.com/file/d/1Nu5hzntq6PtnXyEdR5oteFLzXdw_jVl_/view?usp=sharing",
        "image": "src/assets/images/Projects/vividtones.jpg"
    },
    {
        "title": "PRECISION OBJECT COUNTING SYSTEM",
        "description": "Built a computer vision-based tool for real-time object and people counting using OpenCV.",
        "link": "https://colab.research.google.com/drive/1Q-Wj4eXzCx4HRM-eNA1b1IJTJUzg0Ay_?usp=sharing",
        "image": "src/assets/images/Projects/precisionobjectcounting.png"
    },
    {
        "title": "IRIS FLOWER SPECIES DETECTION",
        "description": "Achieved 97% accuracy using Support Vector Classifier (SVC) to classify flower species based on petal and sepal dimensions.",
        "link": "https://github.com/Chakrapani2122/ML-Projects/tree/main/Iris%20Flower%20Species%20recognition",
        "image": "src/assets/images/Projects/iris.jpg"
    },
    {
        "title": "EMAIL SPAM DETECTION",
        "description": "Improved spam email classification accuracy to 98% using Logistic Regression and feature extraction from text data.",
        "link": "https://github.com/Chakrapani2122/ML-Projects/tree/main/E-mail%20Spam%20detection",
        "image": "src/assets/images/Projects/email-spam.jpg"
    },
    {
        "title": "ADVERTISING SALES PREDICTION",
        "description": "Forecasted sales with 98% accuracy using Random Forest models, optimizing features for better prediction reliability.",
        "link": "https://github.com/Chakrapani2122/ML-Projects/tree/main/Advertising%20Sales%20Prediction",
        "image": "src/assets/images/Projects/advertising-sales.jpg"
    },
    {
        "title": "GUI-BASED WEATHER FORECASTING APPLICATION",
        "description": "Developed a Python app integrated with OpenWeatherMap API to deliver real-time weather forecasts with 95% accuracy.",
        "link": "https://github.com/Chakrapani2122/Weather-App",
        "image": "src/assets/images/Projects/weatherapp.png"
    },
]

for project in projects:
    st.subheader(project["title"])
    st.image(project["image"], use_container_width=True, width=100)
    st.write(project["description"])
    st.markdown(f"[View Source Code]({project['link']})")

# Skills Section
st.header("Skills")
st.write("""
| **Category**                | **Skills**                                                                 |
|-----------------------------|----------------------------------------------------------------------------|
| **Programming Languages**   | Python Programming, Java Programming, C Programming                        |
| **DBMS**                    | Structured Query Language, MySQL                                           |
| **Libraries & Frameworks**  | Pandas, NumPy, Matplotlib, OpenCV, Sci-kit learn, Seaborn, Tkinter         |
| **Data Science**            | Exploratory Data Analysis (EDA), Data Visualization (Tableau), Data Processing, Data Analysis, Statistical Analysis |
| **Machine Learning**        | Classification, Regression, Time-Series Analysis, Deep Learning            |
| **Others**                  | MS Excel, Git, GitHub, Jupyter Notebook, Google Colab, Anaconda Environment |
""")

# Certifications Section
st.header("Certifications")
certifications = [
    {
        "title": "Data Analysis with Python - Coursera",
        "link": "https://link-to-vividtones-project.com",
        "image": "src/assets/images/certificates/Data_Analysis_Coursera.png"
    },
    {
        "title": "Introduction to Data Science - Infosys Springboard",
        "link": "https://link-to-object-counting-project.com",
        "image": "src/assets/images/certificates/Introduction_to_Dat_Science_Infosys_Springboard.png"
    },
    {
        "title": "Python (OOPs) - LinkedIn",
        "link": "https://link-to-iris-project.com",
        "image": "src/assets/images/certificates/OOPs Python.png"
    },
    {
        "title": "Structured Query Language - LinkedIn",
        "link": "https://link-to-email-spam-project.com",
        "image": "src/assets/images/certificates/DC-SQL.jpg"
    },
    {
        "title": "C Programming - LinkedIn",
        "link": "https://link-to-sales-prediction-project.com",
        "image": "src/assets/images/certificates/Linkedin C.jpg"
    },
    {
        "title": "Introduction to AI - SkillUp",
        "link": "https://link-to-weather-app-project.com",
        "image": "src/assets/images/certificates/Skillup-AI.jpg"
    },
]

for certificate in certifications:
    st.subheader(certificate["title"])
    st.image(certificate["image"], use_container_width=True)
    # st.markdown(f"[See Online]({certificate['link']})")

# Resume Download Button
st.header("Resume")
resume_file_path = "src/assets/Chakrapani_Gajji_Resume.pdf"
with open(resume_file_path, "rb") as file:
    btn = st.download_button(
        label="Download Resume",
        data=file,
        file_name="Chakrapani_Gajji_Resume.pdf",
        mime="application/pdf"
    )

# Contact Section
st.header("Contact")
st.subheader("Get in Touch")
with st.form("contact_form"):
    name = st.text_input("Your Name")
    email = st.text_input("Your Email")
    message = st.text_area("Your Message")
    submitted = st.form_submit_button("Submit")
    if submitted:
        # Email configuration
        sender_email = "chakrapani.g99@gmail.com"  # Use a predefined email address
        receiver_email = "chakrapani.g99@gmail.com"
        password = os.getenv("EMAIL_PASSWORD")

        # Create the email content
        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = receiver_email
        msg["Subject"] = "New Contact Form Submission"

        body = f"Name: {name}\nEmail: {email}\nMessage: {message}"
        msg.attach(MIMEText(body, "plain"))

        try:
            # Connect to the server and send the email
            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.starttls()
            server.login(sender_email, password)
            text = msg.as_string()
            server.sendmail(sender_email, receiver_email, text)
            server.quit()
            st.success("Thank you for your message! We will get back to you soon.")
        except smtplib.SMTPAuthenticationError:
            st.error("Authentication error: Please check your email credentials and ensure that less secure app access is enabled or use an App Password if 2-Step Verification is enabled.")
        except Exception as e:
            st.error(f"An error occurred: {e}")