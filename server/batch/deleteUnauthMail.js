const schedule = require('node-schedule');
const { logger } = require('../config/logger');
const { sequelize, User } = require('../models');



const job = schedule.scheduleJob('* * 1 * * *', async() => {

    logger.info('********** start scheduleJob **********');

    const t = await sequelize.transaction();

    try{

        await User.findAll({
            where: sequelize.literal(`LENGTH(password) < 1
                                      AND createdAt < DATE_SUB(NOW(), INTERVAL 1 HOUR)`),

        },{
            transaction: t,

        }).then( users => {

            logger.info('********** destory user :: ' + Object.keys(users).length);

            users.forEach( u => {
                User.update({
                    email: u.uno
                }, {
                    where: { uno: u.uno }
                },{
                    transaction: t,

                }).then( result => {

                    if(result == 1) {
                        User.destroy({
                            where: { uno: u.uno }
                        },{
                            transaction: t,
                        });
                    }

                });
            });

        }).catch( err => {
            logger.error(err);
        });

        await t.commit();

    } catch(err){
        await t.rollback();
        logger.error(err);
    }

    logger.info('********** end scheduleJob **********');

});



module.exports = job;
