#!/bin/bash

export MICROFAB_CONFIG='{
    "port":8080,
    "endorsing_organizations":[
        {
            "name":"GovtOrg"
        },
        {
            "name":"PublicOrgStation1"
        },
        {
            "name":"ABCContractor"
        },
        {
            "name":"XYZContractor"
        }
    ],
    "channels":[
        {
            "name":"road-channel",
            "endorsing_organizations":[
                "GovtOrg",
                "PublicOrgStation1",
                "ABCContractor",
                "XYZContractor"
            ]
        }
    ]
}'

echo "MICRO FAB Configurations : "
echo $MICROFAB_CONFIG

echo "."
echo "Creating Development Enviornment"
echo "."
docker run -e MICROFAB_CONFIG -p 8080:8080 ibmcom/ibp-microfab