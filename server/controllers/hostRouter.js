const hostRouter = require('express').Router()
const Host = require('../models/Host')

hostRouter.get('/', async (request, response) => {
    const hosts = await Host.find({})
    response.json(hosts.map(Host.format))
})

hostRouter.get('/:id', async (request, response) => {
    try {
        const host = await Host.findById(request.params.id)

        if (host) {
            response.json(Host.format(host))
        } else {
            response.status(404).end()
        }
    } catch (exeption) {
        console.log(exception)
        response.status(400).send({ error: 'id wrong' })
    }
})

hostRouter.get('/find/:town', async (request, response) => {
    try {
        const hosts = await Host.find({town: request.params.town})

        if (hosts) {
            response.json(hosts.map(Host.format))
        } else {
            response.status(404).end()
        }
    } catch (exeption) {
        console.log(exception)
        response.status(400).send({ error: 'id wrong' })
    }
})

hostRouter.delete('/:id', async (request, response) => {
    try {
        await Host.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exeption) {
        console.log(exeption)
        response.status(400).send({error: 'id wrong'})
    }
})

hostRouter.post('/', async (request, response) => {
    const body = request.body
    try {
        const host = new Host ({
            hostName: body.hostName,
            hostType: body.hostType,
            country: body.country,
            town: body.town,
            address: body.address,
            description: body.description,
            rooms: body.rooms,
            hostImg: body.hostImg
        })
        const savedHost = await host.save()
        response.json(Host.format(savedHost))
    } catch (exeption) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

hostRouter.put('/:id', (request, response) => {
    const body = request.body

    const host = {
        hostName: body.hostName,
        hostType: body.hostType,
        country: body.country,
        town: body.town,
        address: body.address,
        description: body.description,
        rooms: body.rooms,
        hostImg: body.hostImg
    }
    Host
        .findByIdAndUpdate(request.params.id, host, { new: true } )
        .then(updatedHost => {
            response.json(Host.format(updatedHost))
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({error: 'id wrong'})
        })
})



module.exports = hostRouter



