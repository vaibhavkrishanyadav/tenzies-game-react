import '../styles.css';

export default function dice(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className='dice-box' 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className='dice-value'>
                {props.value}
            </h2>
        </div>
    )
}