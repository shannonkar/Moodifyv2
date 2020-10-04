import React from 'react'

function Header() {
    return (
        <header className="header">
            <div>
                <h3>
                    Moodify
                </h3>
                <p>What mood are you in for today?</p>
                <select name="mood">
                    <option value="workout">Workout</option>
                    <option value="dance">Dance</option>
                    <option value="chill">Chill</option>
                    <option value="chill">Study</option>
                    <option value="sad">Sad</option>
                </select>
            </div>
        </header>
    )
}

export default Header
