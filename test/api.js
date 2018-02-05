const should = require('should');
const request = require('supertest');
const app = require('../app');
const agent = request.agent(app);

describe('API', () => {
  let paragraphId, suggestId

  describe('Article', () => {
    it('should parse an article', () => {
      return agent
        .post('/article')
        .send({
          url: 'https://www.dagbladet.no/kjendis/supermodellen-ble-beskyldt-for-a-ikke-tipse-etter-et-barbesok-na-svarer-hun-pa-kritikken/68573788'
        })
        .expect(200)
        .then(res => {
          res.body.should.have.property('title')
          res.body.should.have.property('paragraphs')
          res.body.paragraphs.should.be.an.instanceOf(Array)

          paragraphId = res.body.paragraphs[0]._id
        })
    })
    it('should return all articles', () => {
      return agent
        .get('/articles')
        .expect(200)
        .then(res => {
          res.body.should.be.an.instanceOf(Array)
        })
    })
  })
  describe('Paragraph', () => {
    it('should suggest paragraph', () => {
      return agent
        .post(`/paragraph/suggest/${paragraphId}`)
        .send({
          usersText: 'suggest text'
        })
        .expect(200)
        .then(res => {
          res.body.should.have.property('suggests')
          res.body.suggests.should.be.an.instanceOf(Array)
          suggestId = res.body.suggests[0]._id
        })
    })
    it('should approve suggest', () => {
      return agent
        .post(`/paragraph/approve/${paragraphId}/${suggestId}`)
        .then(res => {
          res.body.should.have.property('suggests')
          res.body.suggests.should.be.an.instanceOf(Array)
          res.body.suggests[0].isApproved.should.be.equal(true)
        })
    })
  })
})