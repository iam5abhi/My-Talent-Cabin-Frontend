import React from 'react';
import source from "../../../../Assets/Font/Roboto-Light.ttf"
import { Document, Page, Text, View, Image, StyleSheet,Font } from '@react-pdf/renderer';

Font.register({ family: 'Roboto', src: source });

const style = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
    },
    
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
    },

    subtitle: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
    },

    certificate_container: {
        padding: "50px",
        width: "1024px",
        fontFamily: "Roboto",
    },

    certificate: {
    border: '20px solid #0C5280',
    padding:' 25px',
    height:' 600px',
    position: 'relative',
    },

    certificate:{
    content: '',
    top: "0px",
    left: "0px",
    bottom: "0px",
    right: "0px",
    position: "absolute",
    backgroundImage:`url("https://image.ibb.co/ckrVv7/water_mark_logo.png")`,
    backgroundSize: "100%",
    zIndex: "-1",
    },

    certificate_header:{
    width: '80px',
    height: '80px',
    },

    certificate_title: {
       textAlign: 'center',   
    },

    certificate_body: {
       textAlign: 'center',
    },

    Certificate_Completion :{
       fontWeight: '400',
       fontSize: '48px',
       color:'#0C5280',
    }, 

    student_name: {
    fontSize: '24px',
    },

    certificate_content: {
    margin: '0 auto',
    width: '750px',
    },

    about_certificate :{
    width: '380px',
    margin: '0 auto',
    },

    topic_description :{
    textAlign: 'center'
    }
  });
const Certificate = ({ internName, companyName, internshipDuration, signatoryName, signatoryTitle, companyLogo }) => (

<Document>
    <Page orientation="landscape" size="A4" style={style.certificate_container} >
        <View style={style.certificate}>
            <View style={style.water_mark_overlay} />
            <View style={style.certificate_header}>
                <Image src={companyLogo} style="logo" alt />
            </View>
            <View style={style.certificate_body}>
                <Text style={style.certificate_title}><strong>RENR NCLEX AND CONTINUING EDUCATION (CME) Review Masters</strong></Text>
                <Text style={style.Certificate_Completion}>Certificate of Completion</Text>
                <Text style={style.student_name}>{internName}</Text>
                <Text style={style.certificate_content}>
                    <View style={style.about_certificate}>
                        <Text>
                            has completed [{companyName}] hours on topic title here online on Date [{internshipDuration}]
                        </Text>
                    </View>
                    <Text style={style.topic_title}>
                        The Topic consists of [hours] Continuity hours and includes the following:
                    </Text>
                    <View style={style.text_center}>
                        <Text style={style.topic_description} >Contract adminitrator - Types of claim - Claim Strategy - Delay analysis - Thepreliminaries to a claim - The essential elements to a successful claim - Responses - Claim preparation and presentation </Text>
                    </View>
                </Text>
                <Text style={style.certificate_footer }>
                    <View style={style.row}>
                        <Text className="col-md-6">
                            <Text>{signatoryTitle}:{signatoryName}</Text>
                        </Text>
                        <View className="col-md-6">
                            <View style={style.row}>
                                <Text className="col-md-6">
                                    <Text>
                                        Accredited by
                                    </Text>
                                </Text>
                                <Text className="col-md-6">
                                    <Text>
                                        Endorsed by
                                    </Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </Text>
            </View>
        </View>
  </Page>
</Document>
);

export default Certificate;
