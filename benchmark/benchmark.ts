const { spawn } = require('child_process')

const runBenchmark = () => {
    const autocannon = spawn('autocannon', [
        '-c',
        '100', // number of connections
        '-d',
        '10', // duration in seconds
        '-p',
        '10', // pipelining factor
        'http://localhost:3000',
    ])

    autocannon.stdout.on('data', (data: any) => {
        console.log(`${data}`)
    })

    autocannon.stderr.on('data', (data: any) => {
        console.error(`Error: ${data}`)
    })

    autocannon.on('close', (code: number) => {
        if (code === 0) {
            console.log('Benchmarking completed successfully.')
        } else {
            console.error(`Benchmarking process exited with code ${code}`)
        }
    })
}

runBenchmark()
