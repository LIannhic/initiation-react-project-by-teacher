

export default function Button(){
    let count = 0;
    return (
        <>
        {count === 0 &&
        <p>Test</p>
        }
        <button style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }}>
        {count}
        </button>
        </>
    );
}