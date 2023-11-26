import React from "react";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Table,TableHeader,TableCell,TableBody,DataTableCell } from "@david.kucsai/react-pdf-table";

const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    footer: {
      padding: "100px",
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
    TableCellBodyStyle : {
        padding: 5,
        textAlign: "left",
        fontSize: 8,
      }
  });

function Invoice({order}){
return(
    <Document>
        <Page style={styles.body}>
         <Text style={styles.header}>~ {new Date().toLocaleString()} ~</Text>  
         <Text style={styles.title}>Order Invoice</Text>
         <Text style={styles.author}>React-Redux-Ecommerce</Text>
         <Text style={styles.subtitle}>Order Summary</Text>
         <Table>
            <TableHeader>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Color</TableCell>
            </TableHeader>
         </Table>
         <Table>
            <TableBody style={styles.TableCellBodyStyle} data={order.products}>
                <DataTableCell  weighting={0.3} getContent={(item) => item.product.title}/>
                <DataTableCell getContent={(item) => `$${item.product.price}`}/>
                <DataTableCell getContent={(item) => item.count}/>
                <DataTableCell getContent={(item) => item.product.brand}/>
                <DataTableCell getContent={(item) => item.color}/>
            </TableBody>
         </Table>
         <Text style={styles.text}>
           <Text>Date:{new Date(order.paymentIntent.created * 100).toLocaleString()}</Text>
           <Text>OrderId:{order.paymentIntent.id}</Text>
           {'\n'}
           <Text>OrderStatus:{order.orderStatus}</Text>
           {'\n'}
           <Text>Total Paid:{order.paymentIntent.amount}</Text>
           {'\n'}
         </Text>
         <Text style={styles.footer}>
            ~ Thank you for Shopping With US ~
         </Text>
        </Page>
    </Document>
)
}

export default Invoice;