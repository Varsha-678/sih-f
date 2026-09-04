import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, JSON, Text, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from backend.config import DATABASE_URL

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Farmer(Base):
    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), unique=True, index=True, nullable=False)
    district = Column(String(100), default="Yavatmal", nullable=False)
    taluka = Column(String(100), default="Pusad")
    village = Column(String(100), default="Sawargaon")
    preferred_language = Column(String(10), default="mr")  # 'mr', 'en', 'hi'
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    scans = relationship("ScanRecord", back_populates="farmer")
    crops = relationship("FarmerCrop", back_populates="farmer")

class FarmerCrop(Base):
    __tablename__ = "farmer_crops"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("farmers.id"))
    crop_name = Column(String(100), nullable=False)
    variety = Column(String(100))
    sowing_date = Column(DateTime)
    stage = Column(String(50), default="Vegetative")  # Seedling, Vegetative, Flowering, Pod_Formation, Maturity
    acreage = Column(Float, default=2.5)

    farmer = relationship("Farmer", back_populates="crops")

class ScanRecord(Base):
    __tablename__ = "scan_records"

    id = Column(String(50), primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("farmers.id"), nullable=True)
    image_url = Column(String(255), nullable=False)
    heatmap_url = Column(String(255), nullable=True)
    
    # Image Quality Metrics
    blur_score = Column(Float, nullable=False)
    brightness_score = Column(Float, nullable=False)
    is_quality_pass = Column(Boolean, default=True)
    
    # ML Prediction
    crop = Column(String(100), nullable=False)
    condition = Column(String(150), nullable=False)
    scientific_name = Column(String(150), nullable=True)
    raw_confidence = Column(Float, nullable=False)
    calibrated_confidence = Column(Float, nullable=False)
    is_unknown = Column(Boolean, default=False)
    model_version = Column(String(50), nullable=False)
    
    # Severity & Pest
    severity_percentage = Column(Float, default=0.0)
    severity_category = Column(String(50), default="Mild")  # Mild, Moderate, High, Severe
    pest_count = Column(Integer, default=0)
    pest_details = Column(JSON, nullable=True)
    
    # Location & Metadata
    district = Column(String(100), default="Yavatmal")
    latitude = Column(Float, default=20.40)
    longitude = Column(Float, default=78.12)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Expert Validation
    label_level = Column(Integer, default=2)  # 1: Public Raw, 2: Auto-pipeline, 3: Peer review, 4: Expert validated
    expert_verified = Column(Boolean, default=False)
    expert_notes = Column(Text, nullable=True)

    farmer = relationship("Farmer", back_populates="scans")

class DistrictRiskTelemetry(Base):
    __tablename__ = "district_risk_telemetry"

    id = Column(Integer, primary_key=True, index=True)
    district = Column(String(100), unique=True, index=True, nullable=False)
    region = Column(String(100), default="Vidarbha")
    temperature_c = Column(Float, default=31.5)
    relative_humidity = Column(Float, default=78.0)
    rainfall_mm = Column(Float, default=12.4)
    forecast_rain_prob = Column(Float, default=65.0)
    primary_crop = Column(String(100), default="Cotton")
    pest_trap_density = Column(Float, default=14.2)
    active_outbreak_cluster = Column(String(150), default="Pink Bollworm Alert")
    risk_score = Column(Integer, default=72)  # 0 to 100
    risk_level = Column(String(20), default="HIGH")  # LOW, MEDIUM, HIGH
    alert_message_en = Column(Text)
    alert_message_mr = Column(Text)
    alert_message_hi = Column(Text)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
