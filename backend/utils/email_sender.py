# backend/utils/email_sender.py

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email configuration
EMAIL_ADDRESS = "zohaibmuhammad1086@gmail.com"  # Replace with your email
EMAIL_PASSWORD = "rrxb ufds udrh uhbr"    # Replace with your app password
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465

def send_verification_email(to_email: str, code: str, purpose: str = "verification"):
    """
    Send verification code via email
    """
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = to_email
        
        if purpose == "verification":
            msg['Subject'] = "Email Verification Code"
            body = f"""
            Hello,
            
            Your email verification code is: {code}
            
            Please enter this code to verify your email address.
            
            This code will expire soon, so please use it quickly.
            
            Thank you!
            """
        else:  # password reset
            msg['Subject'] = "Password Reset Code"
            body = f"""
            Hello,
            
            Your password reset code is: {code}
            
            Please enter this code to reset your password.
            
            If you did not request this, please ignore this email.
            
            Thank you!
            """
        
        # Attach body to email
        msg.attach(MIMEText(body, 'plain'))
        
        # Create SMTP session
        server = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT)
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        
        # Send email
        text = msg.as_string()
        server.sendmail(EMAIL_ADDRESS, to_email, text)
        server.quit()
        
        return True
        
    except Exception as e:
        print(f"Error sending email: {e}")
        return False