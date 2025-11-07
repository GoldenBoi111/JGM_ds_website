import React from "react";
import SmoothScrollHero from "./SmoothScrollHero.jsx";
import TiltedCard from "./TiltedCard.js";

function SmoothScroolHeroTsx() {
  return (
    <div>
      <SmoothScrollHero />
      <section className="development">
        <div className="pt-10"></div>
        <h2>Areas of development</h2>
        <div className="cards mt-10">
          <div className="card px-10">
            <h3>School Dropout rates</h3>
            <TiltedCard
              imageSrc="https://media.istockphoto.com/id/171306436/photo/red-brick-high-school-building-exterior.jpg?s=612x612&w=0&k=20&c=vksDyCVrfCpvb9uk4-wcBYu6jbTZ3nCOkGHPSgNy-L0="
              altText="XYZ School"
              captionText="XYZ School"
              containerHeight="200px"
              containerWidth="200px"
              imageHeight="200px"
              imageWidth="200px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p
                  style={{
                    fontFamily: "Helvetica Neue",
                    fontWeight: "bold",
                    WebkitTextStrokeWidth: 0.5,
                    WebkitTextStrokeColor: "black",
                    color: "gold",
                    fontSize: 30,
                    padding: 6,
                  }}>
                  XYZ School
                </p>
              }
            />
            <p className="py-2">
              Call out a feature, benefit, or value of you site that can stand
              on its own.
            </p>
          </div>
          <div className="card">
            <h3>Education Quality</h3>
            <TiltedCard
              imageSrc="https://media.istockphoto.com/id/171306436/photo/red-brick-high-school-building-exterior.jpg?s=612x612&w=0&k=20&c=vksDyCVrfCpvb9uk4-wcBYu6jbTZ3nCOkGHPSgNy-L0="
              altText="XYZ School"
              captionText="XYZ School"
              containerHeight="200px"
              containerWidth="200px"
              imageHeight="200px"
              imageWidth="200px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p
                  style={{
                    fontFamily: "Helvetica Neue",
                    fontWeight: "bold",
                    WebkitTextStrokeWidth: 0.5,
                    WebkitTextStrokeColor: "black",
                    color: "gold",
                    fontSize: 30,
                    padding: 6,
                  }}>
                  XYZ School
                </p>
              }
            />
            <p className="py-2">
              Call out a feature, benefit, or value of your site that can stand
              on its own.
            </p>
          </div>
          <div className="card">
            <h3>Child Development index</h3>
            <TiltedCard
              imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkSilI0EKLP6lMPQQAvBkF6KOxweyreZCPvw&s"
              altText="XYZ School"
              captionText="XYZ School"
              containerHeight="200px"
              containerWidth="200px"
              imageHeight="200px"
              imageWidth="200px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p
                  style={{
                    fontFamily: "Helvetica Neue",
                    fontWeight: "bold",
                    WebkitTextStrokeWidth: 0.5,
                    WebkitTextStrokeColor: "black",
                    color: "gold",
                    fontSize: 30,
                    padding: 6,
                  }}>
                  Child
                </p>
              }
            />
            <p className="py-2">
              Call out a feature, benefit, or value of your site that can stand
              on its own.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SmoothScroolHeroTsx;
