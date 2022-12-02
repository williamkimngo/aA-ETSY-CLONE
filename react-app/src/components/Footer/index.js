import React from 'react'
import './footer.css'

const CreaterLinks = () => {
    return (
        <div className="footer">
            <div className="github-links">
                <a href="https://github.com/williamkimngo" target="_blank">
                    <i class="fa-brands fa-github">
                        <div className="names-git">William Ngo</div>
                    </i>
                </a>
            </div>
            <div className="github-links">
                <a href='https://www.linkedin.com/in/william-ngo-005950254/' target="_blank">
                    <i class="fab fa-linkedin-in">
                        <div className="names-git">William Ngo</div>
                    </i>
                </a>
            </div>
        </div>
    )
}
export default CreaterLinks
